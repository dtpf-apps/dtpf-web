import React, { Suspense, lazy } from "react";
const SignInComponent = lazy(() => import("views/components/Admin/SignIn"));
const Helmet = lazy(() => import("views/components/Helmet"));

export default function SignIn() {
  return (
    <Suspense fallback={<></>}>
      <Helmet
        titleHelmet="DTPF | Admin Login"
        contentHelmet="Página de Admin Login"
      />
      <SignInComponent />
    </Suspense>
  );
}
