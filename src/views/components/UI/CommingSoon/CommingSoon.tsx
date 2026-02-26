import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import './CommingSoon.scss';

function CommingSoon() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div className="result-ant">
      <Result
        icon={<SmileOutlined />}
        title="Próximamente!"
        extra={
          <Button type="primary" onClick={goBack}>
            Volver
          </Button>
        }
      />
    </div>
  );
}

export default memo(CommingSoon);
