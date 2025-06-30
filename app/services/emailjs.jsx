import emailjs from "@emailjs/browser";

emailjs.init(process.env.NEXT_PUBLIC_PUBLIC_KEY);

const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID;
const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID;

const serviceIDResp = process.env.NEXT_PUBLIC_SERVICE_ID_RESP;
const templateIDResp = process.env.NEXT_PUBLIC_TEMPLATE_ID_RESP;

const sendEmail = async (form) => {
  try {
    // 1. Envío del formulario original
    await emailjs.sendForm(serviceID, templateID, form);
    console.log("Email enviado correctamente");

    // 2. Envío automático al visitante
    const formData = new FormData(form);
    await emailjs.send(serviceIDResp, templateIDResp, {
      to_name: formData.get("name"),
      to_email: formData.get("email"),
      from_name: "Omegon",
      reply_to: "omegon.info@gmail.com",
      deck_link:
        "https://drive.google.com/file/d/1_KyS81NWBm_aHvwW9LvlB2sVbMnkYHjr/view?usp=drive_link",
      calendly_link: "https://calendly.com/omegon-info/30min",
      custom_message: `Gracias por tu mensaje ${formData.get("name")}.`,
    });

    return true;
  } catch (error) {
    console.error("Error al enviar email:", error);
    return false;
  }
};

export default sendEmail;
