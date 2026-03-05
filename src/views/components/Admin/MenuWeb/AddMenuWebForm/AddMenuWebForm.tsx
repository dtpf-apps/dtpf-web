import React, { memo, useState } from 'react';
import { Form, Input, Button, Select, notification } from 'antd';
import useContextMenu from 'hooks/contexts/useContextMenu';
import { notifDelayErr } from 'utils/notifications';
import { FontSizeOutlined } from '@ant-design/icons';
import './AddMenuWebForm.scss';

interface IAddMenuWebFormProps {
  setIsVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddMenuWebForm({ setIsVisibleModal }: IAddMenuWebFormProps) {
  const { addMenu } = useContextMenu();
  const [menuWebData, setMenuWebData] = useState<Record<string, string>>({});
  const { Option } = Select;

  const handleAddMenu = async () => {
    const url = (menuWebData.http || 'http://') + menuWebData.url;
    if (!menuWebData.title || !menuWebData.url) {
      notification.error({ message: 'Todos los campos son obligatorios.', duration: notifDelayErr });
      return;
    }
    const success = await addMenu({ title: menuWebData.title, url, active: false, order: 1000 });
    if (success) {
      setIsVisibleModal(false);
      setMenuWebData({});
    }
  };

  const selectBefore = (
    <Select
      placeholder="http://"
      style={{ width: 100 }}
      onChange={(e: string) => setMenuWebData({ ...menuWebData, http: e })}
    >
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );

  return (
    <div className="add-menu-web-form">
      <Form className="form-add" onFinish={handleAddMenu}>
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
            addonBefore={selectBefore}
            placeholder="URL"
            value={menuWebData.url}
            onChange={(e) => setMenuWebData({ ...menuWebData, url: e.target.value })}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="btn-submit">
            Crear menú
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default memo(AddMenuWebForm);
