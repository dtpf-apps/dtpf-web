import { useTranslation } from 'react-i18next';
import { AUTHOR } from 'config/site';
import Seo from 'views/components/Seo';

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <>
      <Seo
        pageName="Política de Privacidad"
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
          <p>
            {AUTHOR.name} — {AUTHOR.email}
          </p>
          <h2 className="font-heading text-xl font-bold text-text-primary">Formulario de contacto</h2>
          <p>
            A través del formulario de contacto nos envías voluntariamente tu nombre, tu email y tu mensaje.
            Son los únicos datos que nos facilitas tú; los únicos otros datos que llegan al servidor son los
            registros técnicos que se describen más abajo.
          </p>
          <h2 className="font-heading text-xl font-bold text-text-primary">Registros técnicos</h2>
          <p>
            Para proteger el formulario y el reporte de errores frente al abuso, el servidor limita los envíos
            por dirección IP (tres por hora en el formulario, diez por minuto en los reportes de error) y
            guarda esa dirección IP en memoria solo durante la ventana de la limitación, nunca en una base de
            datos. Los intentos que superan el límite se anotan, con su dirección IP, en el registro técnico
            del servidor. Cuando la web detecta un error en tu navegador, envía al servidor el mensaje del
            error, la página en la que ocurrió y el agente de usuario (el nombre y la versión del navegador),
            sin tu nombre ni tu email, y queda en ese mismo registro. Estos registros sirven únicamente para
            mantener el sitio seguro y en funcionamiento, no se cruzan con los datos del formulario ni se usan
            para identificarte, se conservan durante el tiempo necesario para la seguridad del servicio y no
            se ceden a nadie.
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
            cede a terceros. Como no se conservan datos personales ni se usan cookies, no se solicita
            consentimiento.
          </p>
          <h2 className="font-heading text-xl font-bold text-text-primary">Finalidad</h2>
          <p>
            Los datos del formulario se utilizan exclusivamente para responder a tu consulta; los de la
            analítica, para saber qué páginas se visitan y desde dónde llegan las visitas; los registros
            técnicos, para proteger el sitio y corregir errores. Nada se comparte con terceros ni se utiliza
            con fines comerciales.
          </p>
          <h2 className="font-heading text-xl font-bold text-text-primary">Derechos</h2>
          <p>
            Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición y portabilidad enviando
            un email a {AUTHOR.email}.
          </p>
        </div>
      </div>
    </>
  );
}
