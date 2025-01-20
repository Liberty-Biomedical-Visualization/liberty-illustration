import type { Metadata } from "next";

export default async function ContactSuccess() {
  return (
    <section className="max-w-prose mx-auto text-center">
      <h2 className="text-xl">Message submitted successfully</h2>
      <p>Thank you for your message! I’ll be in touch.</p>
    </section>
  );
}

export const metadata: Metadata = {
  title: "Contact Success",
};
