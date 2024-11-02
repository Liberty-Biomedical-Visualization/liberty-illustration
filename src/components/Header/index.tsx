import resolveClassNames from "@/lib/resolveClassNames";

import Brand, { type BrandProps } from "./Brand";
import Nav, { type NavProps } from "./Nav";

export default function Header(props: Readonly<HeaderProps>) {
  const { logoData, pages } = props;

  const className = resolveClassNames(
    "flex flex-col items-center",
    props.className,
  );

  return (
    <header className={className}>
      <Brand className="mb-4" logoData={logoData} />
      <Nav pages={pages} />
    </header>
  );
}

export interface HeaderProps {
  className?: string;
  logoData: BrandProps["logoData"];
  pages: NavProps["pages"];
}
