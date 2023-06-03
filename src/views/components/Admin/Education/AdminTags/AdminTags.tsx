import React, { useState, useEffect, Suspense, lazy } from "react";
import { getAccessTokenApi } from "api/auth";
import { getCourseApi, addTagApi, deleteTagApi } from "api/education";
import { Button, Row, Col, Form, Divider, Input, Tag, Modal, notification } from "antd";
import { notifDelay, notifDelayErr } from "utils/notifications";
import { TagOutlined, PlusCircleOutlined } from "@ant-design/icons";
import "./AdminTags.scss";
const Spin = lazy(() => import("views/components/UI/Spin"));
const { confirm } = Modal;

export default function AdminTags(props: {
  course: { url: string };
  courseData: { _id: string };
  setReloadCourses: any;
}) {
  const { course, courseData, setReloadCourses } = props;
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
    return () => { unmounted = true };
  }, [course, reloadTags, tag]);
  const deleteTag = (tag: string) => {
    const token = getAccessTokenApi();
    confirm({
      title: "Eliminando tag",
      content: `¿Estas seguro de eliminar el tag ${tag}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteTagApi(token, courseData._id, { tags: [tag] })
          .then((response) => {
            if (response.status === 200) {
              notification["success"]({
                message: `"${tag}" eliminado correctamente.`,
                duration: notifDelay,
              });
              setReloadCourses(true);
              setReloadTags(true);
            } else {
              notification["warning"]({
                message: response.message,
                duration: notifDelay,
              });
            }
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor.",
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
              let tagToClassname = tag.replace(/[ .]/g, "");
              return (
                <Col key={tag} className={tagToClassname}>
                  <TagAnt tag={tag} deleteTag={deleteTag} />
                </Col>
              )
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

function TagAnt(props: any) {
  const { tag, deleteTag } = props;
  return <Tag onClick={() => deleteTag(tag)}>{tag}</Tag>;
}

function AddTagForm(props: any) {
  const { tag, setTag, course, setReloadCourses, setReloadTags } = props;
  const addTag = () => {
    const token = getAccessTokenApi();
    addTagApi(token, course._id, tag)
      .then((response) => {
        if (response.status === 200) {
          notification["success"]({
            message: `"${tag.tags}" añadido correctamente.`,
            duration: notifDelay,
          });
          setReloadCourses(true);
          setReloadTags(true);
          setTag([]);
        } else {
          notification["warning"]({
            message: response.message,
            duration: notifDelayErr,
          });
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor.",
        });
      });
  };
  return (
    <div className="admin-tags__add-tag-form">
      <Form layout="inline" onFinish={addTag}>
        <Input.Group>
          <Input
            prefix={<TagOutlined />}
            placeholder="Añadir Tag"
            value={tag && tag.tags}
            onChange={(e) => setTag({ ...tag, tags: e.target.value })}
          />
          <Button type="primary" htmlType="submit" className="btn-submit">
            <PlusCircleOutlined />
          </Button>
        </Input.Group>
      </Form>
    </div>
  );
}
