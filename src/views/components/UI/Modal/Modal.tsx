import React, { memo } from 'react';
import { Modal as ModalAntd } from 'antd';

interface IModalProps {
  children: any;
  title: string;
  isVisible: boolean;
  setIsVisible: React.Dispatch<boolean>;
  className?: string | undefined;
}

function Modal({ children, title, isVisible, setIsVisible, className }: IModalProps) {
  return (
    <ModalAntd
      title={title}
      centered
      open={isVisible}
      onCancel={() => setIsVisible(false)}
      footer={false}
      className={className}
    >
      {children}
    </ModalAntd>
  );
}

export default memo(Modal);
