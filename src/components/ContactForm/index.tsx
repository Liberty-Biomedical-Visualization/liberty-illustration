"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useId, useState } from "react";

import type { PostContactBody } from "@/app/api/contact/route";
import type postContact from "@/lib/api/postContact";
import resolveClassNames from "@/lib/resolveClassNames";

import Input from "../Input";
import withPostContact from "../withPostContact";

export default function ContactForm(props: Readonly<ContactFormProps>) {
  const [email, setEmail] = useState("");
  const [isInErrorState, setIsInErrorState] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [validation, setValidation] = useState<Partial<PostContactBody> | null>(
    null,
  );
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsInErrorState(false);
    setIsSubmitting(true);
    setValidation(null);

    const body = { email, subject, message };
    const result = await props.postContact(body, fetch);

    if (result.isOk) {
      return router.push("/contact/success");
    }

    if (result.validation) {
      setValidation(result.validation);
    } else {
      setIsInErrorState(true);
    }

    setIsSubmitting(false);
  };

  const errorId = useId();

  const className = resolveClassNames(
    "gap-x-4 grid grid-cols-1 max-w-prose mx-auto sm:grid-cols-2",
    props.className,
  );

  return (
    <form
      aria-describedby={isInErrorState ? errorId : undefined}
      className={className}
      onSubmit={handleSubmit}
    >
      <Input
        disabled={isSubmitting}
        label="Email"
        name="email"
        onChange={(event) => setEmail(event.target.value)}
        type="email"
        validation={validation?.email ?? null}
        value={email}
      />
      <Input
        disabled={isSubmitting}
        label="Subject"
        name="subject"
        onChange={(event) => setSubject(event.target.value)}
        type="text"
        validation={validation?.subject ?? null}
        value={subject}
      />
      <Input
        className="sm:col-span-2"
        disabled={isSubmitting}
        label="Message"
        name="message"
        onChange={(event) => setMessage(event.target.value)}
        type="textarea"
        validation={validation?.message ?? null}
        value={message}
      />
      <button
        className="active:bg-accent-200 bg-accent-500 col-span-1 sm:col-start-2 disabled:bg-accent-700 hover:bg-accent-300 mt-4 p-2 text-background text-lg transition-colors"
        disabled={isSubmitting}
        type="submit"
      >
        Submit
      </button>
      {isInErrorState && (
        <div
          className="max-w-prose mt-4 sm:col-span-2 text-red-600"
          id={errorId}
          role="alert"
        >
          <strong>Oops! Something went wrong.</strong>
          <p>
            We’re experiencing an issue on our side and couldn’t process your
            request. Please try again. If the problem persists, please try again
            later.
          </p>
        </div>
      )}
    </form>
  );
}

export interface ContactFormProps {
  className?: string;
  postContact: typeof postContact;
}

export const ContactFormWithPostContact = withPostContact(ContactForm);
