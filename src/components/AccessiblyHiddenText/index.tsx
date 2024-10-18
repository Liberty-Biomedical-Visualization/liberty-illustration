export default function AccessiblyHiddenText(props: AccessiblyHiddenTextProps) {
  const { children } = props;
  const className =
    "absolute border-0 h-px m-0 overflow-hidden p-0 w-px whitespace-nowrap";
  return <span className={className}>{children}</span>;
}

export interface AccessiblyHiddenTextProps {
  children: string;
}
