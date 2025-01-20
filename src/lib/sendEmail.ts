import mailer from "@sendgrid/mail";

import config from "@/lib/config";

export default async function sendEmail(email: Email) {
  await mailer.send(email);
}

export type Email = mailer.MailDataRequired;
export type EmailSender = typeof sendEmail;

mailer.setApiKey(config.SENDGRID_API_KEY);
