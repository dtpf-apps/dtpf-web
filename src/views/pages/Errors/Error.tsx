import React, { Suspense, lazy, memo } from 'react';
import { useNavigate } from 'react-router';
const Helmet = lazy(() => import('views/components/Helmet'));
const Error404 = lazy(() => import('views/components/Error/Error404'));
const Error500 = lazy(() => import('views/components/Error/Error500'));

function Error(props: { title?: string; subtitle?: string; status?: number }) {
  const { title, subtitle, status } = props;
  const navigate = useNavigate();
  return (
    <Suspense fallback={<></>}>
      <Helmet
        titleHelmet={`DTPF | Error ${status ? status : 404}`}
        contentHelmet={title ? title : 'Recurso no encontrado.'}
      />
      {!status || status === 404 ? (
        <Error404 title={title} subtitle={subtitle} goBack={() => navigate(-1)} />
      ) : (
        <Error500 title={title} subtitle={subtitle} />
      )}
    </Suspense>
  );
}

export default memo(Error);
