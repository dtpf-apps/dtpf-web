import React, { useState, useEffect, memo } from 'react';
import { Form, Input, Button, notification } from 'antd';
import useContextMenu from 'hooks/contexts/useContextMenu';
import { IMenuItem } from 'api/endpoints/menu/menu.response.interface';
import { notifDelay, notifDelayErr } from 'utils/notifications';
import { FontSizeOutlined, LinkOutlined } from '@ant-design/icons';
import './EditMenuWebForm.scss';

interface IEditMenuWebFormProps {
  setIsVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  menu: IMenuItem;
}

function EditMenuWebForm({ setIsVisibleModal, menu }: IEditMenuWebFormProps) {
  const { updateMenu } = useContextMenu();
  const [menuWebData, setMenuWebData] = useState(menu);

  useEffect(() => {
    setMenuWebData(menu);
  }, [menu]);

  const handleEditMenu = async () => {
    if (!menuWebData.title || !menuWebData.url) {
      notification.error({ message: 'Todos los campos son obligatorios.', duration: notifDelayErr });
      return;
    }
    const success = await updateMenu(menuWebData._id, { ...menuWebData });
    if (success) {
      notification.success({ message: 'Menú actualizado correctamente', duration: notifDelay });
      setIsVisibleModal(false);
    }
  };

  return (
    <div className="edit-menu-web-form">
      <Form className="form-edit" onFinish={handleEditMenu}>
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
    </div>
  );
}

export default memo(EditMenuWebForm);
