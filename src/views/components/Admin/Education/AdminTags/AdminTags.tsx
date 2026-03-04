import React, { useState, useEffect, Suspense, lazy, memo } from 'react';
import { getCourseApi, addTagApi, deleteTagApi } from 'api/education';
import { Button, Row, Col, Form, Divider, Input, Tag, Modal, notification, Space } from 'antd';
import { notifDelay, notifDelayErr } from 'utils/notifications';
import { TagOutlined, PlusCircleOutlined } from '@ant-design/icons';
import './AdminTags.scss';
const Spin = lazy(() => import('views/components/UI/Spin'));
const { confirm } = Modal;

interface IAdminTagsProps {
  course: { _id: string; url: string };
  courseData: { _id: string };
  setReloadCourses: React.Dispatch<React.SetStateAction<boolean>>;
}

function AdminTags({ course, courseData, setReloadCourses }: IAdminTagsProps) {
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState([]);
  const [reloadTags, setReloadTags] = useState(false);
  let tagType: any = tag;

  useEffect(() => {
    let unmounted = false;
    getCourseApi(course.url).then((response) => {
      if (!unmounted) {
        setTags(response.course.tags);
      }
    });
    setReloadTags(false);
    return () => {
      unmounted = true;
    };
  }, [course, reloadTags, tag]);

  const deleteTag = (tag: string) => {
    confirm({
      title: 'Eliminando tag',
      content: `¿Estas seguro de eliminar el tag ${tag}?`,
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        deleteTagApi(courseData._id, { tags: [tag] })
          .then((response) => {
            if (response.status === 200) {
              notification['success']({
                message: `"${tag}" eliminado correctamente.`,
                duration: notifDelay,
              });
              setReloadCourses(true);
              setReloadTags(true);
            } else {
              notification['warning']({
                message: response.message,
                duration: notifDelay,
              });
            }
          })
          .catch(() => {
            notification['error']({
              message: 'Error del servidor.',
            });
          });
      },
    });
  };

  return (
    <div>
      {!courseData ? (
        <Suspense fallback={<></>}>
          <Spin />
        </Suspense>
      ) : (
        <div className="admin-tags">
          <Divider className="tag-divider">Tags</Divider>
          <Row className="admin-tags__tags">
            {tags.map((tag: any) => {
              let tagToClassname = tag.replace(/[ .]/g, '');
              return (
                <Col key={tag} className={tagToClassname}>
                  <TagAnt tag={tag} deleteTag={deleteTag} />
                </Col>
              );
            })}
          </Row>
          <div className="admin-tags__add-tag">
            <AddTagForm
              tag={tagType}
              course={course}
              setTag={setTag}
              setReloadCourses={setReloadCourses}
              setReloadTags={setReloadTags}
            />
          </div>
        </div>
      )}
    </div>
  );
}

interface ITagAntProps {
  tag: string;
  deleteTag: (tag: string) => void;
}

function TagAnt({ tag, deleteTag }: ITagAntProps) {
  return <Tag onClick={() => deleteTag(tag)}>{tag}</Tag>;
}

interface IAddTagFormProps {
  tag: any;
  course: { _id: string; url: string };
  setTag: (tag: any) => void;
  setReloadCourses: React.Dispatch<React.SetStateAction<boolean>>;
  setReloadTags: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddTagForm({ tag, setTag, course, setReloadCourses, setReloadTags }: IAddTagFormProps) {
  const addTag = () => {
    addTagApi(course._id, tag)
      .then((response) => {
        if (response.status === 200) {
          notification['success']({
            message: `"${tag.tags}" añadido correctamente.`,
            duration: notifDelay,
          });
          setReloadCourses(true);
          setReloadTags(true);
          setTag([]);
        } else {
          notification['warning']({
            message: response.message,
            duration: notifDelayErr,
          });
        }
      })
      .catch(() => {
        notification['error']({
          message: 'Error del servidor.',
        });
      });
  };
  return (
    <div className="admin-tags__add-tag-form">
      <Form layout="inline" onFinish={addTag}>
        <Space.Compact>
          <Input
            prefix={<TagOutlined />}
            placeholder="Añadir Tag"
            value={tag && tag.tags}
            onChange={(e) => setTag({ ...tag, tags: e.target.value })}
          />
          <Button type="primary" htmlType="submit" className="btn-submit">
            <PlusCircleOutlined />
          </Button>
        </Space.Compact>
      </Form>
    </div>
  );
}

export default memo(AdminTags);
