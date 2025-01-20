import config from "@/lib/config";
import type { Email, EmailSender } from "@/lib/sendEmail";

export default async function sendContactEmail(
  fields: Readonly<ContactEmailFields>,
  sendEmail: EmailSender,
) {
  const email = transformToEmail(fields);
  await sendEmail(email);
}

function transformToEmail(fields: Readonly<ContactEmailFields>): Email {
  return {
    from: {
      email: config.CONTACT_SENDER_EMAIL,
      name: config.CONTACT_SENDER_NAME,
    },
    subject: "Contact",
    text:
      `Email:\n${fields.email}\n\n` +
      `Subject:\n${fields.subject}\n\n` +
      `Message:\n${fields.message}`,
    to: config.CONTACT_RECIPIENT_EMAIL,
  };
}

interface ContactEmailFields {
  email: string;
  message: string;
  subject: string;
}
