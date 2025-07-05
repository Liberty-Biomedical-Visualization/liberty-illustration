"use client";

import FocusTrap from "focus-trap-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import resolveClassNames from "@/lib/resolveClassNames";

import NavList, { type NavListProps } from "./List";
import NavListToggle from "./ListToggle";

export default function Nav(props: Readonly<NavProps>) {
  const { disableTabbableDisplayCheck, pages } = props;
  const [navIsShown, setNavIsShown] = useState(false);
  const pathname = usePathname();
  const lastPathname = useRef(pathname);
  const bodyPaddingRight = useRef(0);

  const hideNav = useCallback(() => {
    enableScrolling(bodyPaddingRight.current);
    setNavIsShown(false);
  }, []);

  const hideNavOnNavigation = useCallback(() => {
    if (navIsShown && lastPathname.current !== pathname) {
      hideNav();
    }
  }, [hideNav, lastPathname, navIsShown, pathname]);

  useEffect(hideNavOnNavigation, [hideNavOnNavigation]);

  const updateLastPathname = () => {
    lastPathname.current = pathname;
  };

  useEffect(updateLastPathname, [pathname]);

  useEffect(
    () => hideNavWhenShownAboveMediumBreakpoint(hideNav, navIsShown),
    [hideNav, navIsShown],
  );

  const showNav = () => {
    bodyPaddingRight.current = parseFloat(
      getComputedStyle(document.body).paddingRight,
    );
    disableScrolling(bodyPaddingRight.current);
    setNavIsShown(true);
  };

  const toggleList = () => {
    if (navIsShown) {
      hideNav();
    } else {
      showNav();
    }
  };

  const handleEscape = () => {
    hideNav();
    return true;
  };

  const hideNavOnSamePage = (href: string) => {
    if (href === pathname) {
      hideNav();
    }
  };

  const className = resolveClassNames(
    baseClassNames,
    navIsShown ? "visible" : "hidden",
    props.className,
  );

  return (
    <FocusTrap
      active={navIsShown}
      focusTrapOptions={{
        escapeDeactivates: handleEscape,
        tabbableOptions: {
          // Setting displayCheck to "none" allows FocusTrap to be used with
          // jsdom for testing.
          displayCheck: disableTabbableDisplayCheck ? "none" : "full",
        },
      }}
    >
      <div>
        <NavListToggle
          id={navListToggleId}
          listIsShown={navIsShown}
          navListId={navId}
          onClick={toggleList}
        />
        <nav aria-labelledby={navListToggleId} className={className} id={navId}>
          <NavList onItemClick={hideNavOnSamePage} pages={pages} />
        </nav>
      </div>
    </FocusTrap>
  );
}

export interface NavProps {
  className?: string;
  disableTabbableDisplayCheck?: boolean | undefined;
  pages: NavListProps["pages"];
}

const baseClassNames =
  "bg-white fixed h-full left-0 md:flex md:h-auto md:static md:visible top-0 w-full z-10";

const navId = "nav";
const navListToggleId = "nav-list-toggle";

function disableScrolling(bodyPaddingRight: number) {
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = bodyPaddingRight + scrollbarWidth + "px";
}

function enableScrolling(bodyPaddingRight: number) {
  document.body.style.overflow = "auto";
  document.body.style.paddingRight = bodyPaddingRight + "px";
}

function hideNavWhenShownAboveMediumBreakpoint(
  hideList: () => void,
  listIsShown: boolean,
) {
  // Guard against running an environment without a global window such as tests.
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return;
  }

  const mediaQuery = window.matchMedia("(max-width: 768px)");

  const handleMediaQueryChange = () => {
    if (listIsShown && !mediaQuery.matches) {
      hideList();
    }
  };

  mediaQuery.addEventListener("change", handleMediaQueryChange);

  const stopHidingListWhenShownAboveMediumBreakpoint = () =>
    mediaQuery.removeEventListener("change", handleMediaQueryChange);

  return stopHidingListWhenShownAboveMediumBreakpoint;
}
