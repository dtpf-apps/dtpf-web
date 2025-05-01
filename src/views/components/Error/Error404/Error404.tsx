import React, { memo } from 'react';
import { Result, Button } from 'antd';
import '../Error.scss';

function Error404(props: { title?: string; subtitle?: string; history: any }) {
  const { title, subtitle, history } = props;
  return (
    <div className="error-ant">
      <Result
        status="404"
        title={title ? title : 'Ups! Página no encontrada...'}
        subTitle={subtitle ? subtitle : 'Lo siento, la página que buscas no existe.'}
        extra={
          <Button type="primary" onClick={history.goBack}>
            Volver
          </Button>
        }
      />
    </div>
  );
}

export default memo(Error404);
