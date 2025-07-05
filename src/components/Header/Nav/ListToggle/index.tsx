import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AccessiblyHiddenText from "@/components/AccessiblyHiddenText";
import resolveClassNames from "@/lib/resolveClassNames";

export default function NavListToggle(props: Readonly<NavListToggleProps>) {
  const { id, listIsShown, navListId, onClick } = props;
  const className = resolveClassNames(baseClassName, props.className);

  return (
    <button
      aria-controls={navListId}
      aria-expanded={listIsShown}
      aria-haspopup
      className={className}
      id={id}
      onClick={onClick}
    >
      <FontAwesomeIcon
        fixedWidth
        icon={listIsShown ? faTimes : faBars}
        size="2x"
      />
      <AccessiblyHiddenText>Navigation</AccessiblyHiddenText>
    </button>
  );
}

export interface NavListToggleProps {
  className?: string;
  id: string;
  listIsShown: boolean;
  navListId: string;
  onClick: () => void;
}

const baseClassName =
  "cursor-pointer fixed right-4 md:hidden py-0.5 top-4 z-20";
