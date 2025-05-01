import React, { Suspense, lazy, memo } from 'react';
const SignInComponent = lazy(() => import('views/components/Admin/SignIn'));
const Helmet = lazy(() => import('views/components/Helmet'));

function SignIn() {
  return (
    <Suspense fallback={<></>}>
      <Helmet titleHelmet="DTPF | Admin Login" contentHelmet="Página de Admin Login" />
      <SignInComponent />
    </Suspense>
  );
}

export default memo(SignIn);
