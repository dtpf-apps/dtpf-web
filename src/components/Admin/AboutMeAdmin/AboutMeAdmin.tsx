import React, { useEffect, useState, Suspense, lazy } from "react";
import { withRouter } from "react-router-dom";
import { getAccessTokenApi } from "../../../api/auth";
import { getAboutMeInfoApi, updateAboutMeInfoApi } from "../../../api/aboutMe";
import { Form, Input, Button, notification, Divider } from "antd";
import { notifDelay, notifDelayErr } from "../../../utils/notifications";
import "./AboutMeAdmin.scss";
const Spin = lazy(() => import("../../../components/UI/Spin"));

function AboutMeAdmin(props: any) {
  const { reloadAboutMeAdmin, setReloadAboutMeAdmin } = props;
  const [mainInfo, setMainInfo] = useState(null);
  const [cubeInfo, setCubeInfo] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getAboutMeInfoApi("mainInfo").then((response) => {
      isMounted && setMainInfo(response.info);
    });
    getAboutMeInfoApi("cube").then((response) => {
      isMounted && setCubeInfo(response.info);
    });
    return () => {
      isMounted = false;
    };
  }, [reloadAboutMeAdmin]);

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

function AboutMe(props: any) {
  const { mainInfo, setMainInfo, cubeInfo, setCubeInfo, setReloadAboutMeAdmin } = props;
  const token = getAccessTokenApi();
  const { TextArea } = Input;
  const updateAboutMeMainInfo = () => {
    updateAboutMeInfoApi(token, mainInfo, "mainInfo").then((response) => {
      if (response.status === 200) {
        notification["success"]({
          message: response.message,
          duration: notifDelay,
        });
        setReloadAboutMeAdmin(true);
      } else {
        notification["error"]({
          message: response.message,
          duration: notifDelayErr,
        });
        setReloadAboutMeAdmin(false);
      }
    });
  };
  const updateAboutMeCubeInfo = () => {
    updateAboutMeInfoApi(token, cubeInfo, "cube").then((response) => {
      if (response.status === 200) {
        notification["success"]({
          message: response.message,
          duration: notifDelay,
        });
        setReloadAboutMeAdmin(true);
      } else {
        notification["error"]({
          message: response.message,
          duration: notifDelayErr,
        });
        setReloadAboutMeAdmin(false);
      }
    });
  };

  return (
    <div>
      {!mainInfo || !cubeInfo ? (
        <Suspense fallback={<></>}>
          <Spin />
        </Suspense>
      ) : (
        <div>
          <Form className="about_me-form-main" layout="inline" onFinish={updateAboutMeMainInfo}>
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
          <Form className="about_me-form-cube" layout="inline" onFinish={updateAboutMeCubeInfo}>
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
                  value={cubeInfo.content2}
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
                  value={cubeInfo.content3}
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
                  value={cubeInfo.content4}
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
                  value={cubeInfo.content5}
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
                  value={cubeInfo.content6}
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
      )}
    </div>
  );
}

export default withRouter(AboutMeAdmin);
