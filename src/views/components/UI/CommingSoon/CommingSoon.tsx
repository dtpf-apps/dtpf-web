import React, { memo } from "react";
import { useHistory } from "react-router";
import { Result, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import "./CommingSoon.scss";

function CommingSoon() {
  const history = useHistory();
  const goBack = history.goBack;
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