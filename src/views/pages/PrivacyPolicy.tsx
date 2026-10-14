import { useTranslation } from 'react-i18next';
import { SITE_NAME } from 'config/site';
import Seo from 'views/components/Seo';

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <>
      <Seo
        title={`Política de Privacidad — ${SITE_NAME}`}
        description={t('seo_desc_privacy', { lng: 'es' })}
        ogKey="privacy-policy"
        esOnly
      />
      <div lang="es" className="mx-auto max-w-[800px] px-6 py-16 pb-24">
        <h1 className="mb-8 font-heading text-4xl font-bold tracking-tight">Política de Privacidad</h1>
        <div className="space-y-6 text-[15px] leading-relaxed text-text-secondary">
          <p>
            En cumplimiento con el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica de
            Protección de Datos (LOPD), te informamos sobre el tratamiento de datos personales en este sitio
            web.
          </p>
          <h2 className="font-heading text-xl font-bold text-text-primary">Responsable del tratamiento</h2>
          <p>David T. Pizarro Frick — davidpizarrofrick@gmail.com</p>
          <h2 className="font-heading text-xl font-bold text-text-primary">Formulario de contacto</h2>
          <p>
            Los únicos datos personales que recopilamos son los que nos envías voluntariamente a través del
            formulario de contacto: nombre, email y mensaje.
          </p>
          <h2 className="font-heading text-xl font-bold text-text-primary">Analítica web</h2>
          <p>
            Este sitio mide sus visitas con Umami, una herramienta de analítica de código abierto alojada en
            nuestros propios servidores. Funciona sin cookies y sin guardar ningún identificador en tu
            navegador; por eso no verás un aviso de cookies. No se almacena tu dirección IP: junto con el
            navegador se convierte en un hash con una sal que rota de forma periódica, de modo que no es
            posible identificarte y el hash solo sirve para contar visitantes durante ese periodo. Lo que
            queda registrado es agregado: página visitada, procedencia (por ejemplo, un buscador o LinkedIn),
            país, tipo de dispositivo, navegador e idioma. Ningún dato sale de nuestra infraestructura ni se
            cede a terceros. Al no tratarse datos personales ni usarse cookies, no se solicita consentimiento.
          </p>
          <h2 className="font-heading text-xl font-bold text-text-primary">Finalidad</h2>
          <p>
            Los datos del formulario se utilizan exclusivamente para responder a tu consulta; los de la
            analítica, para saber qué páginas se visitan y desde dónde llegan las visitas. Nada se comparte
            con terceros ni se utiliza con fines comerciales.
          </p>
          <h2 className="font-heading text-xl font-bold text-text-primary">Derechos</h2>
          <p>
            Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición y portabilidad enviando
            un email a davidpizarrofrick@gmail.com.
          </p>
        </div>
      </div>
    </>
  );
}
