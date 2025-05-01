import React, { Suspense, lazy, memo } from 'react';
import { useHistory } from 'react-router-dom';
const Helmet = lazy(() => import('views/components/Helmet'));
const Error404 = lazy(() => import('views/components/Error/Error404'));
const Error500 = lazy(() => import('views/components/Error/Error500'));

function Error(props: { title?: string; subtitle?: string; status: number }) {
  const { title, subtitle, status } = props;
  const history = useHistory();
  return (
    <Suspense fallback={<></>}>
      <Helmet
        titleHelmet={`DTPF | Error ${status ? status : 404}`}
        contentHelmet={title ? title : 'Recurso no encontrado.'}
      />
      {!status || status === 404 ? (
        <Error404 title={title} subtitle={subtitle} history={history} />
      ) : (
        <Error500 title={title} subtitle={subtitle} />
      )}
    </Suspense>
  );
}

export default memo(Error);
