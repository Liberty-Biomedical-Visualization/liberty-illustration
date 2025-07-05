import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FocusTrap from "focus-trap-react";
import { MutableRefObject, useEffect, useRef, useState } from "react";

import AccessiblyHiddenText from "@/components/AccessiblyHiddenText";
import Carousel, { type CarouselProps } from "@/components/Carousel";
import type { ImageGallery } from "@/lib/content";
import resolveClassNames from "@/lib/resolveClassNames";
import {
  type TransitionDuration,
  transitionDurationClassNames,
} from "@/lib/TransitionDuration";

export default function Lightbox(props: Readonly<LightboxProps>) {
  const {
    disableTabbableDisplayCheck,
    imageIndex,
    images,
    imageTransitionDuration,
    onClose,
    visibilityTransitionDuration,
  } = props;

  const timeoutId = useRef<number | null>(null);
  useEffect(() => cleanUpPendingTimeout(timeoutId), []);

  useEffect(() => disableScrolling(), []);

  const isInitiallyVisible = visibilityTransitionDuration === null;
  const [isVisible, setIsVisible] = useState(isInitiallyVisible);
  useEffect(
    () => makeVisible(isInitiallyVisible, setIsVisible),
    [isInitiallyVisible],
  );

  const opacity = isVisible ? "opacity-100" : "opacity-0";

  const transition =
    visibilityTransitionDuration === null
      ? ""
      : `${transitionDurationClassNames[visibilityTransitionDuration]} transition`;

  const className = resolveClassNames(
    "bg-foreground/95 fixed flex flex-col inset-0 items-center justify-center overscroll-contain px-6 py-10 sm:px-14 z-30",
    opacity,
    transition,
    props.className,
  );

  const orderedImages = [
    ...images.slice(imageIndex),
    ...images.slice(0, imageIndex),
  ];

  const sizedImages = orderedImages.map(transformToSizedImage);

  const handleClose = () => {
    if (isInitiallyVisible) {
      onClose();
    } else {
      setIsVisible(false);
      timeoutId.current = window.setTimeout(
        onClose,
        visibilityTransitionDuration,
      );
    }
  };

  const handleEscape = () => {
    handleClose();
    // Returning false prevents the FocusTrap from being deactivated immediately
    // when escape is pressed. This gives control over the FocusTrap to
    // Lightbox’s parent by dismounting the component in onClose.
    return false;
  };

  return (
    <FocusTrap
      focusTrapOptions={{
        escapeDeactivates: handleEscape,
        tabbableOptions: {
          // Setting displayCheck to "none" allows FocusTrap to be used with
          // jsdom for testing.
          displayCheck: disableTabbableDisplayCheck ? "none" : "full",
        },
      }}
    >
      <div aria-modal className={className} role="dialog">
        <button
          className="absolute active:text-neutral-500 hover:text-neutral-300 right-1 text-neutral-50 top-1 transition"
          onClick={handleClose}
        >
          <FontAwesomeIcon className="size-8 sm:size-12" icon={faXmark} />
          <AccessiblyHiddenText>Close</AccessiblyHiddenText>
        </button>
        <div className="container h-full">
          <Carousel
            className="h-full"
            images={sizedImages}
            showCaption
            slideDuration={null}
            transitionDuration={imageTransitionDuration}
          />
        </div>
      </div>
    </FocusTrap>
  );
}

export interface LightboxProps {
  className?: string;
  disableTabbableDisplayCheck?: boolean;
  imageIndex: number;
  images: CarouselProps["images"];
  imageTransitionDuration: CarouselProps["transitionDuration"];
  onClose: () => void;
  visibilityTransitionDuration: TransitionDuration | null;
}

function cleanUpPendingTimeout(timeoutId: MutableRefObject<number | null>) {
  return () => {
    if (timeoutId.current !== null) {
      window.clearTimeout(timeoutId.current);
    }
  };
}

function disableScrolling() {
  const bodyPaddingRight = parseFloat(
    getComputedStyle(document.body).paddingRight,
  );

  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = bodyPaddingRight + scrollbarWidth + "px";

  const enableScrolling = () => {
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = bodyPaddingRight + "px";
  };

  return enableScrolling;
}

function makeVisible(
  isInitiallyVisible: boolean,
  setIsVisible: (isVisible: boolean) => void,
) {
  if (!isInitiallyVisible) {
    window.setTimeout(() => setIsVisible(true));
  }
}

function transformToSizedImage(image: ImageGallery["images"][number]) {
  const { height, width } = image;

  return {
    ...image,
    height: Math.min(height, 1_024),
    width: Math.min(width, 1_024),
  };
}
