import resolveClassNames from "@/lib/resolveClassNames";

import ListItem, { NavListItemProps as ItemProps } from "./Item";

export default function NavList(props: Readonly<NavListProps>) {
  const { onItemClick, pages } = props;

  const className = resolveClassNames(baseClassNames, props.className);

  const items = pages.map((page, index) => {
    const isLastPage = index === pages.length - 1;
    return transformToItem(page, isLastPage, onItemClick);
  });

  return <ul className={className}>{items}</ul>;
}

export interface NavListProps {
  className?: string;
  onItemClick: ItemProps["onClick"];
  pages: readonly Readonly<PageNavData>[];
}

const baseClassNames = "md:flex";

function transformToItem(
  page: Readonly<PageNavData>,
  isLastPage: boolean,
  onClick: NavListProps["onItemClick"],
) {
  const { href, name } = page;

  const className = isLastPage
    ? ""
    : "md:after:content-pipe md:after:mx-2 md:after:text-foreground";

  return (
    <ListItem className={className} href={href} key={href} onClick={onClick}>
      {name}
    </ListItem>
  );
}

interface PageNavData {
  href: ItemProps["href"];
  name: ItemProps["children"];
}
