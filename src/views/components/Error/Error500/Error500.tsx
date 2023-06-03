import React from "react";
import { Result } from "antd";
import "../Error.scss";

export default function Error500(props: {
  title?: string;
  subtitle?: string;
}) {
  const { title, subtitle } = props;
  return (
    <div className="error-ant">
      <Result
        status="500"
        title={title ? title : "Ups! Error del servidor..."}
        subTitle={
          subtitle
            ? subtitle
            : "Lo siento, ha ocurrido un error en el servidor, vuelve más tarde."
        }
        extra={
          <div>La página se reiniciará automáticamente cuando se solucione el problema.</div>
        }
      />
    </div>
  );
}
