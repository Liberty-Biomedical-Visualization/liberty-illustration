import resolveClassNames from "@/lib/resolveClassNames";

import NavItem, { type NavItemProps } from "./Item";

export default function Nav(props: Readonly<NavProps>) {
  const { pages } = props;

  const items = pages.map((page, index) =>
    transformToNavItem(page, index === pages.length - 1),
  );

  const className = resolveClassNames(
    "flex flex-nowrap flex-row",
    props.className,
  );

  return (
    <nav className={className}>
      <ul className="flex flex-nowrap flex-row">{items}</ul>
    </nav>
  );
}

export interface NavProps {
  className?: string;
  pages: readonly Readonly<PageNavData>[];
}

function transformToNavItem(page: Readonly<PageNavData>, isLastPage: boolean) {
  const { href, name } = page;

  const className = isLastPage
    ? ""
    : "after:content-pipe after:mx-2 after:text-foreground";

  return (
    <li className={className} key={href}>
      <NavItem href={href}>{name}</NavItem>
    </li>
  );
}

interface PageNavData {
  href: NavItemProps["href"];
  name: NavItemProps["children"];
}
