import Link from "next/link";
import { usePathname } from "next/navigation";

import resolveClassNames from "@/lib/resolveClassNames";

export default function NavListItem(props: Readonly<NavListItemProps>) {
  const { children, href, onClick } = props;
  const pathname = usePathname();

  const className = resolveClassNames(baseClassName, props.className);

  const color =
    pathname === href
      ? "active:text-accent-200 hover:text-accent-400 text-accent-600"
      : "active:text-accent-400 hover:text-accent-600 text-accent-800";

  const linkClassName = resolveClassNames(
    "block md:inline md:text-lg md:p-0 md:transition md:uppercase p-4",
    color,
  );

  return (
    <li className={className}>
      <Link className={linkClassName} href={href} onClick={() => onClick(href)}>
        {children}
      </Link>
    </li>
  );
}

export interface NavListItemProps {
  children: string;
  className?: string;
  href: string;
  onClick: (href: string) => void;
}

const baseClassName = "mb-4 md:mb-0 text-2xl text-center";
