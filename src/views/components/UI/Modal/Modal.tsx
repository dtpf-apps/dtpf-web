import React from "react";
import { Modal as ModalAntd } from "antd";

export default function Modal(props: {
  children: any
  title: string
  isVisible: boolean
  setIsVisible: React.Dispatch<boolean>
  className: any
}) {
  const { children, title, isVisible, setIsVisible, className } = props;
  return (
    <ModalAntd
      title={title}
      centered
      visible={isVisible}
      onCancel={() => setIsVisible(false)}
      footer={false}
      className={className}
    >
      {children}
    </ModalAntd>
  );
}
