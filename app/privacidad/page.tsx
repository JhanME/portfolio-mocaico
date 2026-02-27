import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad del sitio web de Jhan Mocaico.",
  robots: { index: false, follow: false },
};

export default function Privacidad() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 font-sans px-4 py-16">
      <div className="max-w-2xl mx-auto space-y-8">

        <Link href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition">
          ← Volver al inicio
        </Link>

        <h1 className="text-3xl font-bold">Política de Privacidad</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Última actualización: {new Date().toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" })}</p>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">1. Responsable</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            El responsable del tratamiento de datos es <strong>MOCAICO ESPIRITU JHAN JHOVER</strong>, con RUC 10600939489, con domicilio en Lima, Perú. Contacto: jhan.mocaico@upch.pe · +51 963 242 281.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">2. Datos que recopilamos</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Este sitio web es un portafolio informativo. No contamos con formularios de registro ni recogemos datos personales de forma automática. El único dato que podemos recibir es el que tú nos envíes voluntariamente al contactarnos por correo electrónico.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">3. Finalidad del uso</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Los datos de contacto que nos envíes serán utilizados exclusivamente para responder tu mensaje y gestionar la relación profesional que pueda derivarse. No serán cedidos a terceros ni utilizados con fines comerciales.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">4. Cookies</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Este sitio utiliza únicamente el almacenamiento local del navegador (<em>localStorage</em>) para recordar tu preferencia de modo oscuro o claro. No se utilizan cookies de rastreo ni de publicidad de terceros.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">5. Tus derechos</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            De acuerdo con la Ley N.º 29733 (Ley de Protección de Datos Personales del Perú), tienes derecho a acceder, rectificar, cancelar u oponerte al tratamiento de tus datos personales. Para ejercerlos, contáctanos en jhan.mocaico@upch.pe.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">6. Cambios en esta política</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Nos reservamos el derecho de actualizar esta política en cualquier momento. La fecha de última actualización siempre estará visible al inicio de esta página.
          </p>
        </section>

        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-400">
          MOCAICO ESPIRITU JHAN JHOVER · RUC: 10600939489 · Lima, Perú
        </div>

      </div>
    </main>
  );
}
