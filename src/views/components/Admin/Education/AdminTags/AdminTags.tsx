import React, { useState, useEffect, Suspense, lazy, memo } from 'react';
import { getCourseAPI } from 'api/endpoints/education/education.api';
import useContextEducation from 'hooks/contexts/useContextEducation';
import { Button, Row, Col, Form, Divider, Input, Tag, Modal, Space } from 'antd';
import { TagOutlined, PlusCircleOutlined } from '@ant-design/icons';
import './AdminTags.scss';
const Spin = lazy(() => import('views/components/UI/Spin'));
const { confirm } = Modal;

interface IAdminTagsProps {
  course: { _id: string; url: string };
  courseData: { _id: string };
}

function AdminTags({ course, courseData }: IAdminTagsProps) {
  const { addTag, deleteTag } = useContextEducation();
  const [tags, setTags] = useState<string[]>([]);
  const [tagValue, setTagValue] = useState('');

  const loadTags = () => {
    getCourseAPI({ url: course.url }).then(({ response, data }) => {
      if (response.status === 200) {
        setTags(data.course.tags);
      }
    });
  };

  useEffect(() => {
    loadTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course]);

  const handleDeleteTag = (tag: string) => {
    confirm({
      title: 'Eliminando tag',
      content: `¿Estas seguro de eliminar el tag ${tag}?`,
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      async onOk() {
        const success = await deleteTag(courseData._id, { tags: [tag] });
        if (success) loadTags();
      },
    });
  };

  const handleAddTag = async () => {
    if (!tagValue) return;
    const success = await addTag(course._id, { tags: tagValue });
    if (success) {
      loadTags();
      setTagValue('');
    }
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
            {tags.map((tag: string) => {
              let tagToClassname = tag.replace(/[ .]/g, '');
              return (
                <Col key={tag} className={tagToClassname}>
                  <TagAnt tag={tag} deleteTag={handleDeleteTag} />
                </Col>
              );
            })}
          </Row>
          <div className="admin-tags__add-tag">
            <div className="admin-tags__add-tag-form">
              <Form layout="inline" onFinish={handleAddTag}>
                <Space.Compact>
                  <Input
                    prefix={<TagOutlined />}
                    placeholder="Añadir Tag"
                    value={tagValue}
                    onChange={(e) => setTagValue(e.target.value)}
                  />
                  <Button type="primary" htmlType="submit" className="btn-submit">
                    <PlusCircleOutlined />
                  </Button>
                </Space.Compact>
              </Form>
            </div>
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

export default memo(AdminTags);
