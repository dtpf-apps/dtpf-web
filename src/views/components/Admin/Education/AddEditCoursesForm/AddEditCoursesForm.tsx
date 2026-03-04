import React, { useState, useEffect, useCallback, memo } from 'react';
import { Row, Col, Form, Input, InputNumber, Button, Image, DatePicker, notification, Space } from 'antd';
import { useDropzone } from 'react-dropzone';
import AdminTags from '../AdminTags';
import { addCourseApi, updateCourseApi, getImageApi, uploadImageApi } from 'api/education';
import { LinkOutlined, FontSizeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { notifDelay, notifDelayErr } from 'utils/notifications';
import NoImage from 'assets/img/png/no-image.png';
import './AddEditCoursesForm.scss';

dayjs.extend(customParseFormat);
const { TextArea } = Input;

interface IAddEditCoursesFormProps {
  setIsVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  setReloadCourses: React.Dispatch<React.SetStateAction<boolean>>;
  course?: any;
}

function AddEditCoursesForm({ setIsVisibleModal, setReloadCourses, course }: IAddEditCoursesFormProps) {
  const [image, setImage] = useState(null);
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    if (course) {
      setCourseData(course);
    } else {
      setCourseData([]);
    }
  }, [course]);

  useEffect(() => {
    if (course && course.image) {
      getImageApi(course.image).then((response) => {
        setImage(response.url);
      });
    } else {
      setImage(null);
    }
  }, [course]);

  return (
    <div className="add-edit-course">
      {course && <UploadImage image={image} setImage={setImage} />}
      <AddEditForm
        courseData={courseData}
        setCourseData={setCourseData}
        course={course}
        setReloadCourses={setReloadCourses}
        image={image}
        setIsVisibleModal={setIsVisibleModal}
      />
    </div>
  );
}

interface IAddEditFormProps {
  courseData: any;
  setCourseData: (data: any) => void;
  course?: any;
  setReloadCourses: React.Dispatch<React.SetStateAction<boolean>>;
  image?: any;
  setIsVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddEditForm({
  courseData,
  setCourseData,
  course,
  setReloadCourses,
  image,
  setIsVisibleModal,
}: IAddEditFormProps) {
  const [proccessCourseState, setProccessCourseState] = useState(false);

  useEffect(() => {
    if (image) {
      setCourseData({ ...courseData, image: image.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const processCourse = () => {
    const { title, url, description, duration } = courseData;
    if (!title || !url || !description || !duration) {
      notification['warning']({
        message: 'Los campos de título, url, descripción y duración son obligatorios.',
      });
    } else {
      if (!course) {
        addCourse();
      } else {
        updateCourse();
      }
    }
  };

  const updateCourse = async () => {
    let userUpdate = courseData;
    if (typeof userUpdate.image === 'object') {
      await uploadImageApi(userUpdate.image, course._id).then((response) => {
        if (response.status === 200) {
          userUpdate.image = response.image;
          updateCourseApi(course._id, userUpdate).then((result) => {
            if (result.status === 200) {
              notification['success']({
                message: result.message,
                duration: notifDelay,
              });
              setIsVisibleModal(false);
              setReloadCourses(true);
            } else {
              notification['error']({
                message: result.message,
                duration: notifDelayErr,
              });
              setReloadCourses(true);
            }
          });
        } else {
          notification['error']({
            message: response.message,
            duration: notifDelay,
          });
          setIsVisibleModal(false);
          setReloadCourses(true);
        }
      });
    } else {
      await updateCourseApi(course._id, courseData)
        .then((response) => {
          if (response.status === 200) {
            notification['success']({
              message: response.message,
            });
            setIsVisibleModal(false);
            setReloadCourses(true);
            setCourseData([]);
          } else {
            const typeNotification = response.status === 500 ? 'error' : 'warning';
            notification[typeNotification]({
              message: response.message,
            });
          }
        })
        .catch(() => {
          notification['error']({
            message: 'Error del servidor.',
          });
        });
    }
  };

  const addCourse = async () => {
    await addCourseApi(courseData)
      .then((response) => {
        if (response.status !== 200) {
          notification['warning']({
            message: response.message,
          });
        } else {
          notification['success']({
            message: response.message,
          });
          setIsVisibleModal(false);
          setReloadCourses(true);
          setCourseData([]);
        }
      })
      .catch(() => {
        notification['error']({
          message: 'Error del servidor.',
        });
      });
  };

  const loading = () => {
    setProccessCourseState(true);
  };

  setTimeout(() => {
    setProccessCourseState(false);
  }, 6000);

  return (
    <>
      <Form className="add-edit-course-form" layout="inline" onFinish={processCourse}>
        <Row className="add-edit-course-form-course">
          <Col span={24}>
            <Form.Item>
              <Input
                prefix={<FontSizeOutlined />}
                placeholder="Titulo"
                value={courseData.title}
                onChange={(e) => {
                  setCourseData({
                    ...courseData,
                    title: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Input
                prefix={<LinkOutlined />}
                placeholder="URL"
                value={courseData.url}
                onChange={(e) =>
                  setCourseData({
                    ...courseData,
                    url: transformTextToUrl(e.target.value),
                  })
                }
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Input
                prefix={<LinkOutlined />}
                placeholder="Plataforma"
                value={courseData.platform}
                onChange={(e) =>
                  setCourseData({
                    ...courseData,
                    platform: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Col>
          <Space.Compact style={{ width: '100%' }}>
            <DatePicker
              style={{ width: '70%' }}
              format="DD/MM/YYYY HH:mm:ss"
              placeholder="Fecha de publicación"
              value={courseData.date && dayjs(courseData.date)}
              onChange={(_e, value) =>
                setCourseData({
                  ...courseData,
                  date: dayjs(value as string, 'DD/MM/YYYY HH:mm:ss').toISOString(),
                })
              }
            />
            <InputNumber
              style={{ width: '30%' }}
              placeholder="Duración"
              value={courseData.duration}
              onChange={(e) =>
                setCourseData({
                  ...courseData,
                  duration: e,
                })
              }
            />
          </Space.Compact>
          <Col span={24}>
            <TextArea
              rows={5}
              placeholder="Descripción"
              value={courseData.description ? courseData.description : ''}
              onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
            ></TextArea>
          </Col>
          <Col span={24}>
            <Input
              prefix={<LinkOutlined />}
              placeholder="Link"
              value={courseData.link}
              onChange={(e) =>
                setCourseData({
                  ...courseData,
                  link: e.target.value,
                })
              }
            />
          </Col>
        </Row>
        <Button
          type="primary"
          htmlType="submit"
          loading={proccessCourseState}
          onClick={loading}
          className="btn-submit"
        >
          {course ? 'Actualizar curso' : 'Crear curso'}
        </Button>
      </Form>
      {course && <AdminTags course={course} courseData={courseData} setReloadCourses={setReloadCourses} />}
    </>
  );
}

interface IUploadImageProps {
  image: any;
  setImage: (image: any) => void;
}

function UploadImage({ image, setImage }: IUploadImageProps) {
  const [imageUrl, setImageUrl] = useState('');
  let imageType: string = imageUrl;
  useEffect(() => {
    if (image) {
      if (image.preview) {
        setImageUrl(image.preview);
      } else {
        setImageUrl(image);
      }
    } else {
      setImageUrl('');
    }
  }, [image]);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file === undefined) {
        notification['error']({
          message: 'Formato de imágen inválido.',
          duration: notifDelay,
        });
      } else {
        setImage({ file, preview: URL.createObjectURL(file) });
      }
    },
    [setImage]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/jpeg': [], 'image/png': [] },
    noKeyboard: true,
    onDrop,
  });
  return (
    <div className="upload-image" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Image src={NoImage} preview={false} />
      ) : (
        <Image src={imageType ? imageType : NoImage} preview={false} />
      )}
      <span>Tamaño de imágen: 750px x 422px</span>
    </div>
  );
}

function transformTextToUrl(text: string) {
  const url = text
    .replace(/[:,()]/g, '')
    .replace(/ /g, '-')
    .replace(/ - /g, '-')
    .replace(/---/g, '-')
    .replace(/á/gi, 'a')
    .replace(/é/gi, 'e')
    .replace(/í/gi, 'i')
    .replace(/ó/gi, 'o')
    .replace(/ú/gi, 'u');
  return url.toLowerCase();
}

export default memo(AddEditCoursesForm);
