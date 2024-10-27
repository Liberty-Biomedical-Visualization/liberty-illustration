import resolveClassNames from "@/lib/resolveClassNames";

import Certifications, { type CertificationsProps } from "./Certifications";
import Copyright, { type CopyrightProps } from "./Copyright";

export default function Footer(props: Readonly<FooterProps>) {
  const {
    amiLogoData,
    cmiLogoData,
    copyrightHolder,
    copyrightYear,
    currentYear,
  } = props;

  const className = resolveClassNames(
    "flex flex-col gap-4 items-center",
    props.className,
  );

  return (
    <footer className={className}>
      <Certifications amiLogoData={amiLogoData} cmiLogoData={cmiLogoData} />
      <Copyright
        currentYear={currentYear}
        holder={copyrightHolder}
        initialYear={copyrightYear}
      />
    </footer>
  );
}

export interface FooterProps {
  amiLogoData: CertificationsProps["amiLogoData"];
  className?: string;
  cmiLogoData: CertificationsProps["cmiLogoData"];
  copyrightHolder: CopyrightProps["holder"];
  copyrightYear: CopyrightProps["initialYear"];
  currentYear: CopyrightProps["currentYear"];
}
