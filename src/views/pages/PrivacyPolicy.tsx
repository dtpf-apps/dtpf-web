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
          <h2 className="font-heading text-xl font-bold text-text-primary">Datos que recopilamos</h2>
          <p>
            Solo recopilamos los datos que nos envías voluntariamente a través del formulario de contacto:
            nombre, email y mensaje. Utilizamos Umami Analytics, una herramienta de analítica web respetuosa
            con la privacidad, alojada en nuestros propios servidores. No se utilizan cookies de seguimiento
            persistentes. Solo se recopilan datos anónimos de navegación si aceptas las cookies analíticas.
          </p>
          <h2 className="font-heading text-xl font-bold text-text-primary">Finalidad</h2>
          <p>
            Los datos recopilados se utilizan exclusivamente para responder a tu consulta. No se comparten con
            terceros ni se utilizan con fines comerciales.
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
