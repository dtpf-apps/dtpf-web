import React, { Suspense, lazy, memo } from "react"
const Helmet = lazy(() => import("views/components/Helmet"))
const ContactPage = lazy(() => import("views/components/Web/Contact"))
const ButtonGoBack = lazy(() => import("views/components/UI/ButtonGoBack"))

function Contact(props: { history: { goBack: () => void }}) {
  const { history } = props
  return (
    <Suspense fallback={<></>}>
      <Helmet
        titleHelmet="DTPF | Contacto"
        contentHelmet="Página para contactar con David T. Pizarro Frick"
      />
      <ButtonGoBack goBack={history.goBack} eventGoBack="contacto" />
      <ContactPage />
    </Suspense>
  )
}

export default memo(Contact)