import resolveClassNames from "@/lib/resolveClassNames";

export default function PageHeading(props: Readonly<PageHeadingProps>) {
  const { children } = props;
  const className = resolveClassNames(baseClassName, props.className);
  return <h2 className={className}>{children}</h2>;
}

const baseClassName = "sm:text-3xl text-2xl text-center";

export interface PageHeadingProps {
  children: string;
  className?: string;
}
