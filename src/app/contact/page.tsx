import type { Metadata } from "next";

import { ContactFormWithPostContact } from "@/components/ContactForm";
import PageHeading from "@/components/PageHeading";

export default async function Contact() {
  return (
    <section>
      <PageHeading className="mb-4">Contact</PageHeading>
      <ContactFormWithPostContact />;
    </section>
  );
}

export const metadata: Metadata = {
  title: "Contact",
};
