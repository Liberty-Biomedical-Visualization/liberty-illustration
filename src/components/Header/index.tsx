import resolveClassNames from "@/lib/resolveClassNames";

import Brand, { type BrandProps } from "./Brand";

export default function Header(props: HeaderProps) {
  const { logoData } = props;
  const className = resolveClassNames(
    "flex flex-col items-center",
    props.className,
  );

  return (
    <header className={className}>
      <Brand logoData={logoData} />
    </header>
  );
}

export interface HeaderProps {
  className?: string;
  logoData: BrandProps["logoData"];
}
