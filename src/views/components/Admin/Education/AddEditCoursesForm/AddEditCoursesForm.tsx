import React, { useState, useEffect, useCallback, memo } from 'react';
import { Row, Col, Form, Input, InputNumber, Button, Image, DatePicker, notification, Space } from 'antd';
import { useDropzone } from 'react-dropzone';
import AdminTags from '../AdminTags';
import useContextEducation from 'hooks/contexts/useContextEducation';
import { getImageUrl } from 'api/endpoints/education/education.api';
import { LinkOutlined, FontSizeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { notifDelay } from 'utils/notifications';
import NoImage from 'assets/img/png/no-image.png';
import './AddEditCoursesForm.scss';

dayjs.extend(customParseFormat);
const { TextArea } = Input;

interface IAddEditCoursesFormProps {
  setIsVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  course?: any;
}

function AddEditCoursesForm({ setIsVisibleModal, course }: IAddEditCoursesFormProps) {
  const [image, setImage] = useState<any>(null);
  const [courseData, setCourseData] = useState<any>([]);

  useEffect(() => {
    if (course) {
      setCourseData(course);
    } else {
      setCourseData([]);
    }
  }, [course]);

  useEffect(() => {
    if (course && course.image) {
      setImage(getImageUrl(course.image));
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
  image?: any;
  setIsVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddEditForm({ courseData, setCourseData, course, image, setIsVisibleModal }: IAddEditFormProps) {
  const { addCourse, updateCourse, uploadImage } = useContextEducation();
  const [proccessCourseState, setProccessCourseState] = useState(false);

  useEffect(() => {
    if (image) {
      setCourseData({ ...courseData, image: image.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const processCourse = async () => {
    const { title, url, description, duration } = courseData;
    if (!title || !url || !description || !duration) {
      notification['warning']({
        message: 'Los campos de título, url, descripción y duración son obligatorios.',
      });
      return;
    }
    setProccessCourseState(true);
    try {
      if (!course) {
        const success = await addCourse({ ...courseData });
        if (success) {
          setIsVisibleModal(false);
          setCourseData([]);
        }
      } else {
        let data = { ...courseData };
        if (typeof data.image === 'object') {
          const imageName = await uploadImage(data.image, course._id);
          if (!imageName) return;
          data.image = imageName;
        }
        const success = await updateCourse(course._id, { ...data });
        if (success) {
          setIsVisibleModal(false);
          setCourseData([]);
        }
      }
    } finally {
      setProccessCourseState(false);
    }
  };

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
        <Button type="primary" htmlType="submit" loading={proccessCourseState} className="btn-submit">
          {course ? 'Actualizar curso' : 'Crear curso'}
        </Button>
      </Form>
      {course && <AdminTags course={course} courseData={courseData} />}
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
