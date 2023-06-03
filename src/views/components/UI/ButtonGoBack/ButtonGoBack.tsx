import React from "react";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { gaEvent } from "utils/analytics.js";
import "./ButtonGoBack.scss";

export default function ButtonGoBack(props: any) {
  const { goBack, eventGoBack } = props;
  const clickGoBack = () => {
    gaEvent(`click_goBack_${eventGoBack}`, "clicks", "UI Clicks", true);
  };
  return (
    <div className="button-go-back__goBack" onClick={clickGoBack}>
      <Button type="primary" onClick={goBack}>
        <LeftOutlined />
      </Button>
    </div>
  );
}
