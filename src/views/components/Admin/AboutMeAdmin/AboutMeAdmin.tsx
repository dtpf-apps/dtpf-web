import React, { useState, Suspense, lazy } from 'react';
import { Form, Input, Button, Divider } from 'antd';
import useContextAboutMe from 'hooks/contexts/useContextAboutMe';
import { IAboutMeInfo } from 'api/endpoints/aboutMe/aboutMe.response.interface';
import './AboutMeAdmin.scss';
const Spin = lazy(() => import('views/components/UI/Spin'));

function AboutMeAdmin() {
  const { mainInfo, cubeInfo, isLoading, updateMainInfo, updateCubeInfo } = useContextAboutMe();

  if (isLoading || !mainInfo || !cubeInfo) {
    return (
      <Suspense fallback={<></>}>
        <Spin />
      </Suspense>
    );
  }

  return (
    <AboutMeForm
      mainInfo={mainInfo}
      cubeInfo={cubeInfo}
      updateMainInfo={updateMainInfo}
      updateCubeInfo={updateCubeInfo}
    />
  );
}

function AboutMeForm({
  mainInfo: initialMainInfo,
  cubeInfo: initialCubeInfo,
  updateMainInfo,
  updateCubeInfo,
}: {
  mainInfo: IAboutMeInfo;
  cubeInfo: IAboutMeInfo;
  updateMainInfo: (data: IAboutMeInfo) => Promise<boolean>;
  updateCubeInfo: (data: IAboutMeInfo) => Promise<boolean>;
}) {
  const { TextArea } = Input;
  const [mainInfo, setMainInfo] = useState(initialMainInfo);
  const [cubeInfo, setCubeInfo] = useState(initialCubeInfo);

  return (
    <div>
      <Form className="about_me-form-main" layout="inline" onFinish={() => updateMainInfo(mainInfo)}>
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
      <Form className="about_me-form-cube" layout="inline" onFinish={() => updateCubeInfo(cubeInfo)}>
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
