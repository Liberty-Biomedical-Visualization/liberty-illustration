"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import resolveClassNames from "@/lib/resolveClassNames";

export default function NavItem(props: Readonly<NavItemProps>) {
  const { children, href } = props;
  const pathname = usePathname();

  const color =
    pathname === href
      ? "active:text-accent-200 hover:text-accent-400 text-accent-600"
      : "active:text-accent-400 hover:text-accent-600 text-accent-800";

  const linkClassName = resolveClassNames(
    "text-lg transition uppercase",
    color,
    props.className,
  );

  return (
    <Link className={linkClassName} href={href}>
      {children}
    </Link>
  );
}

export interface NavItemProps {
  children: string;
  className?: string;
  href: string;
}
