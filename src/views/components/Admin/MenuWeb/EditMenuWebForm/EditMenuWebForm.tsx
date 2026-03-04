import React, { useState, useEffect, memo } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { updateMenuApi } from 'api/menu';
import { notifDelay, notifDelayErr } from 'utils/notifications';
import { FontSizeOutlined, LinkOutlined } from '@ant-design/icons';
import './EditMenuWebForm.scss';

interface IEditMenuWebFormProps {
  setIsVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  setReloadMenuWeb: React.Dispatch<React.SetStateAction<boolean>>;
  menu: any;
}

function EditMenuWebForm({ setIsVisibleModal, setReloadMenuWeb, menu }: IEditMenuWebFormProps) {
  const [menuWebData, setMenuWebData] = useState(menu);

  useEffect(() => {
    setMenuWebData(menu);
  }, [menu]);

  const editMenu = () => {
    if (!menuWebData.title || !menuWebData.url) {
      notification['error']({
        message: 'Todos  los campos son obligatorios.',
        duration: notifDelayErr,
      });
    } else {
      updateMenuApi(menuWebData._id, menuWebData)
        .then((response) => {
          notification['success']({
            message: response.message,
            duration: notifDelay,
          });
          setIsVisibleModal(false);
          setReloadMenuWeb(true);
        })
        .catch(() => {
          notification['error']({
            message: 'Error del servidor. Inténtelo más tarde.',
            duration: notifDelayErr,
          });
        });
    }
  };

  return (
    <div className="edit-menu-web-form">
      <EditForm menuWebData={menuWebData} setMenuWebData={setMenuWebData} editMenu={editMenu} />
    </div>
  );
}

interface IEditFormProps {
  menuWebData: any;
  setMenuWebData: React.Dispatch<React.SetStateAction<any>>;
  editMenu: () => void;
}

function EditForm({ menuWebData, setMenuWebData, editMenu }: IEditFormProps) {
  return (
    <Form className="form-edit" onFinish={editMenu}>
      <Form.Item>
        <Input
          prefix={<FontSizeOutlined />}
          placeholder="Título"
          value={menuWebData.title}
          onChange={(e) => setMenuWebData({ ...menuWebData, title: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LinkOutlined />}
          placeholder="Url"
          value={menuWebData.url}
          onChange={(e) => setMenuWebData({ ...menuWebData, url: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualizar menú
        </Button>
      </Form.Item>
    </Form>
  );
}

export default memo(EditMenuWebForm);
