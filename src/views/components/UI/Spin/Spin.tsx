import React from 'react'
import { Spin as SpinAnt } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function Spin(props: any) {
    const { className, paddingTop, height } = props;
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return (
        <SpinAnt
          indicator={antIcon}
          className={className}
          style={{
            textAlign: "center",
            width: "100%",
            height: height ? height : "100vh",
            padding: "20px",
            paddingTop: paddingTop ? paddingTop : "200px",
            color: "#5d718d"
          }}
        />
    )
}
