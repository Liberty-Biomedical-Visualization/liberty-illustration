import resolveClassNames from "@/lib/resolveClassNames";
import AmiMember, { type AmiMemberProps } from "./AmiMember";
import CmiCertification, {
  type CmiCertificationProps,
} from "./CmiCertification";

export default function Certifications(props: Readonly<CertificationsProps>) {
  const { amiLogoData, cmiLogoData } = props;
  const className = resolveClassNames(
    "flex flex-col gap-x-8 gap-y-4 sm:flex-row",
    props.className,
  );

  return (
    <ul className={className}>
      <li>
        <CmiCertification logoData={cmiLogoData} />
      </li>
      <li>
        <AmiMember logoData={amiLogoData} />
      </li>
    </ul>
  );
}

export interface CertificationsProps {
  amiLogoData: AmiMemberProps["logoData"];
  className?: string;
  cmiLogoData: CmiCertificationProps["logoData"];
}
