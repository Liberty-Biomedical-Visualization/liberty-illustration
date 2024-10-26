export default function Copyright(props: CopyrightProps) {
  const { currentYear, holder, initialYear } = props;
  const rangeToCurrentYear = currentYear > initialYear ? `–${currentYear}` : "";
  const content = `© ${initialYear}${rangeToCurrentYear} ${holder}. All rights reserved.`;
  return <small>{content}</small>;
}

export interface CopyrightProps {
  readonly currentYear: number;
  readonly holder: string;
  readonly initialYear: number;
}
