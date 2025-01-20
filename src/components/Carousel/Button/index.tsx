import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AccessiblyHiddenText from "@/components/AccessiblyHiddenText";
import resolveClassNames from "@/lib/resolveClassNames";

export default function CarouselButton(props: Readonly<CarouselButtonProps>) {
  const { disabled, onClick, type } = props;
  const className = resolveClassNames(baseClassName, props.className);
  const icon = type === "next" ? faChevronRight : faChevronLeft;
  const text = type === "next" ? "Next image" : "Previous image";

  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
      <AccessiblyHiddenText>{text}</AccessiblyHiddenText>
    </button>
  );
}

export interface CarouselButtonProps {
  className?: string;
  disabled?: boolean;
  onClick: () => void;
  type: "next" | "previous";
}

const baseClassName =
  "active:bg-accent-200 bg-accent-500 disabled:bg-accent-700 hover:bg-accent-300 py-2 sm:px-4 sm:py-12 text-background transition-colors";
