import { type ChangeEvent, type HTMLInputTypeAttribute, useId } from "react";

import resolveClassNames from "@/lib/resolveClassNames";

export default function Input(props: Readonly<InputProps>) {
  const { disabled, label, name, onChange, type, validation, value } = props;

  const className = resolveClassNames(
    "flex flex-col relative pb-4",
    props.className,
  );

  const id = useId();
  const validationId = `${id}-validation`;

  const control =
    type === "textarea" ? (
      <textarea
        aria-describedby={validation ? validationId : undefined}
        className="border p-2"
        disabled={disabled}
        id={id}
        name={name}
        onChange={onChange}
        required
        value={value}
      />
    ) : (
      <input
        aria-describedby={validation ? validationId : undefined}
        className="border p-2"
        disabled={disabled}
        id={id}
        name={name}
        onChange={onChange}
        required
        type={type}
        value={value}
      />
    );

  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      {control}
      {validation && (
        <div
          className="absolute text-red-600 text-sm -bottom-1"
          id={validationId}
          role="alert"
        >
          {validation}
        </div>
      )}
    </div>
  );
}

export interface InputProps {
  className?: string;
  disabled?: boolean;
  label: string;
  name: string;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  type: HTMLInputTypeAttribute | "textarea";
  validation?: string | null;
  value?: string;
}
