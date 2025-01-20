import type { Metadata } from "next";

import { ContactFormWithPostContact } from "@/components/ContactForm";

export default async function Contact() {
  return <ContactFormWithPostContact />;
}

export const metadata: Metadata = {
  title: "Contact",
};
