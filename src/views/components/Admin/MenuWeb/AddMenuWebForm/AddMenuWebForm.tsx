import React, { useState } from "react";
import { Form, Input, Button, Select, notification } from "antd";
import { addMenuApi } from "api/menu";
import { getAccessTokenApi } from "api/auth";
import { notifDelay, notifDelayErr } from "utils/notifications";
import { FontSizeOutlined } from "@ant-design/icons";
import "./AddMenuWebForm.scss";

export default function AddMenuWebForm(props: any) {
  const { setIsVisibleModal, setReloadMenuWeb } = props;
  const [menuWebData, setMenuWebData] = useState({});
  return (
    <div className="add-menu-web-form">
      <AddForm
        menuWebData={menuWebData}
        setMenuWebData={setMenuWebData}
        setIsVisibleModal={setIsVisibleModal}
        setReloadMenuWeb={setReloadMenuWeb}
      />
    </div>
  );
}

function AddForm(props: any) {
  const { menuWebData, setMenuWebData, setIsVisibleModal, setReloadMenuWeb } = props;
  const { Option } = Select;
  const addMenu = () => {
    let finalData: any = {
      title: menuWebData.title,
      url: (menuWebData.http ? menuWebData.http : "http://") + menuWebData.url
    };
    if (!finalData.title || !finalData.url || !menuWebData.url) {
      notification["error"]({
        message: "Todos los campos son obligatorios.",
        duration: notifDelayErr
      });
    } else {
      const accessToken = getAccessTokenApi();
      finalData.active = false;
      finalData.order = 1000;
      addMenuApi(accessToken, finalData)
        .then(response => {
          notification["success"]({
            message: response.message,
            duration: notifDelay
          });
          setIsVisibleModal(false);
          setReloadMenuWeb(true);
          setMenuWebData({});
          finalData = {};
        })
        .catch(() => {
          notification["error"]({
            message: "Error del servidor.",
            duration: notifDelayErr
          });
        })
    }
  };
  const selectBefore = (
    <Select
      placeholder="http://"
      style={{ width: 100 }}
      onChange={(e) => setMenuWebData({ ...menuWebData, http: e })}
    >
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );
  return (
    <Form className="form-add" onFinish={addMenu}>
      <Form.Item>
        <Input
          prefix={<FontSizeOutlined />}
          placeholder="Título"
          value={menuWebData.title}
          onChange={e => setMenuWebData({ ...menuWebData, title: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Input
          addonBefore={selectBefore}
          placeholder="URL"
          value={menuWebData.url}
          onChange={e =>
            setMenuWebData({ ...menuWebData, url: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">Crear menú</Button>
      </Form.Item>
    </Form>
  );
}
