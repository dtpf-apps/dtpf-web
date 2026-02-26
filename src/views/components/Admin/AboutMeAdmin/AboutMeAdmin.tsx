import React, { useEffect, useState, Suspense, lazy } from 'react';
import { getAboutMeInfoAPI, updateAboutMeInfoAPI } from 'api/endpoints/aboutMe/aboutMe.api';
import { Form, Input, Button, notification, Divider } from 'antd';
import { notifDelay, notifDelayErr } from 'utils/notifications';
import './AboutMeAdmin.scss';
import { IgetAboutMeInfoAPIResponseInfo } from 'api/endpoints/aboutMe/brandUsers.response.interface';
import { getAccessTokenApi } from 'api/endpoints/auth/auth.api';
const Spin = lazy(() => import('views/components/UI/Spin'));

function AboutMeAdmin(props: any) {
  const { reloadAboutMeAdmin, setReloadAboutMeAdmin } = props;
  const [mainInfo, setMainInfo] = useState<IgetAboutMeInfoAPIResponseInfo | null>(null);
  const [cubeInfo, setCubeInfo] = useState<IgetAboutMeInfoAPIResponseInfo | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const getAboutMeInfo = await getAboutMeInfoAPI({ key: 'mainInfo' });
      isMounted && setMainInfo(getAboutMeInfo.data.info);
      const getAboutMeCubeInfo = await getAboutMeInfoAPI({ key: 'cube' });
      isMounted && setCubeInfo(getAboutMeCubeInfo.data.info);
    })();
    return () => {
      isMounted = false;
    };
  }, [reloadAboutMeAdmin]);

  if (!mainInfo || !cubeInfo) {
    return (
      <Suspense fallback={<></>}>
        <Spin />
      </Suspense>
    );
  }

  return (
    <AboutMe
      mainInfo={mainInfo}
      setMainInfo={setMainInfo}
      cubeInfo={cubeInfo}
      setCubeInfo={setCubeInfo}
      setReloadAboutMeAdmin={setReloadAboutMeAdmin}
    />
  );
}

type TAboutMeProps = {
  mainInfo: IgetAboutMeInfoAPIResponseInfo;
  setMainInfo: (info: IgetAboutMeInfoAPIResponseInfo) => void;
  cubeInfo: IgetAboutMeInfoAPIResponseInfo;
  setCubeInfo: (info: IgetAboutMeInfoAPIResponseInfo) => void;
  setReloadAboutMeAdmin: (reload: boolean) => void;
};

function AboutMe({ mainInfo, setMainInfo, cubeInfo, setCubeInfo, setReloadAboutMeAdmin }: TAboutMeProps) {
  const token = getAccessTokenApi();
  const { TextArea } = Input;

  const onFinishUpdateMainInfo = async () => {
    if (!token) return;
    try {
      const updateAboutMeInfo = await updateAboutMeInfoAPI({
        newData: mainInfo,
        key: 'mainInfo',
        token,
      });

      if (updateAboutMeInfo.response.status === 200) {
        notification['success']({
          message: updateAboutMeInfo.data.message,
          duration: notifDelay,
        });
        setReloadAboutMeAdmin(true);
      } else {
        notification['error']({
          message: updateAboutMeInfo.data.message,
          duration: notifDelayErr,
        });
        setReloadAboutMeAdmin(false);
      }
    } catch (error) {
      console.error('Error updating main info:', error);
      notification['error']({
        message: 'Error del servidor',
        duration: notifDelayErr,
      });
      setReloadAboutMeAdmin(false);
      return;
    }
  };

  const onFinishUpdateCubeInfo = async () => {
    if (!token) return;
    try {
      const updateAboutMeCube = await updateAboutMeInfoAPI({
        newData: cubeInfo,
        key: 'cube',
        token,
      });

      if (updateAboutMeCube.response.status === 200) {
        notification['success']({
          message: updateAboutMeCube.data.message,
          duration: notifDelay,
        });
        setReloadAboutMeAdmin(true);
      } else {
        notification['error']({
          message: updateAboutMeCube.data.message,
          duration: notifDelayErr,
        });
        setReloadAboutMeAdmin(false);
      }
    } catch (error) {
      console.error('Error updating cube info:', error);
      notification['error']({
        message: 'Error del servidor',
        duration: notifDelayErr,
      });
      setReloadAboutMeAdmin(false);
      return;
    }
  };

  return (
    <div>
      <Form className="about_me-form-main" layout="inline" onFinish={onFinishUpdateMainInfo}>
        <h1>Información Principal</h1>
        <Form.Item>
          <TextArea
            rows={4}
            placeholder="Información principal"
            value={mainInfo.content1}
            onChange={(e) => {
              setMainInfo({
                ...mainInfo,
                content1: e.target.value,
              });
            }}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualizar
        </Button>
      </Form>
      <Divider />
      <Form className="about_me-form-cube" layout="inline" onFinish={onFinishUpdateCubeInfo}>
        <div>
          <h1>Cubo</h1>
          <Form.Item>
            <Input
              placeholder="Lado 1"
              value={cubeInfo.content1}
              onChange={(e) => {
                setCubeInfo({
                  ...cubeInfo,
                  content1: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="Lado 2"
              value={cubeInfo.content2 ?? ''}
              onChange={(e) => {
                setCubeInfo({
                  ...cubeInfo,
                  content2: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="Lado 3"
              value={cubeInfo.content3 ?? ''}
              onChange={(e) => {
                setCubeInfo({
                  ...cubeInfo,
                  content3: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="Lado 4"
              value={cubeInfo.content4 ?? ''}
              onChange={(e) => {
                setCubeInfo({
                  ...cubeInfo,
                  content4: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="Lado 5"
              value={cubeInfo.content5 ?? ''}
              onChange={(e) => {
                setCubeInfo({
                  ...cubeInfo,
                  content5: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="Lado 6"
              value={cubeInfo.content6 ?? ''}
              onChange={(e) => {
                setCubeInfo({
                  ...cubeInfo,
                  content6: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="btn-submit">
            Actualizar
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AboutMeAdmin;
