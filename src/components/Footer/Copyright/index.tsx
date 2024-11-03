export default function Copyright(props: Readonly<CopyrightProps>) {
  const { currentYear, holder, initialYear } = props;
  const rangeToCurrentYear = currentYear > initialYear ? `–${currentYear}` : "";
  const content = `© ${initialYear}${rangeToCurrentYear} ${holder}. All rights reserved.`;
  return <small className="text-nowrap">{content}</small>;
}

export interface CopyrightProps {
  readonly currentYear: number;
  readonly holder: string;
  readonly initialYear: number;
}
