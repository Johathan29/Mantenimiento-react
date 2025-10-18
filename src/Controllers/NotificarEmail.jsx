import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export const ContactForm = () => {
  const formRef = useRef();
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    const serviceID = "service_xwx6zyg";
    const templateID = "template_ckzszal";

    emailjs.sendForm(serviceID, templateID, formRef.current, "zXoe7og8_NhY2uUUN")
      .then(() => {
        alert("✅ Email enviado correctamente!");
        setSending(false);
      })
      .catch((err) => {
        console.error("❌ Error enviando email:", err);
        alert("Error enviando correo");
        setSending(false);
      });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-3 p-6 bg-white rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Contáctanos</h2>
 <input type="hidden" name="time" value="Mar 10 2025 08:46"></input>
      <label className="block text-gray-600 text-sm">Nombre</label>
      <input
        type="text"
        name="name"
        required
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
      />

      <label className="block text-gray-600 text-sm">Correo electrónico</label>
      <input
        type="email"
        name="email"
        required
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
      />

      <label className="block text-gray-600 text-sm">Mensaje</label>
      <textarea
        name="message"
        rows="4"
        required
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
      />

      <button
        type="submit"
        disabled={sending}
        className={`w-full py-2 rounded-md text-white font-semibold transition ${
          sending ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {sending ? "Enviando..." : "Enviar correo"}
      </button>
    </form>
  );
};
