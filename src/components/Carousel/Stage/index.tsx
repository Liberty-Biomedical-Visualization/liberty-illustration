import resolveClassNames from "@/lib/resolveClassNames";

import CarouselSlide, { type CarouselSlideProps } from "../Slide";

export default function CarouselStage(props: Readonly<CarouselStageProps>) {
  const {
    currentImage,
    nextImage,
    previousImage,
    showCaption,
    transition,
    transitionDuration,
  } = props;

  const className = resolveClassNames(
    // sm:w-260 makes avoids extra whitespace and possible reflow by fixing the
    // stage slightly larger than the maximum image width of 1,024 pixels.
    "flex flex-nowrap max-h-screen overflow-x-hidden sm:w-260",
    props.className,
  );

  const images = [previousImage, currentImage, nextImage] as const;
  const transitionClassName = resolveTransitionClassName(
    transition,
    transitionDuration,
  );
  const slides = images.map((image, index) =>
    mapToSlide(image, index, transition, transitionClassName, showCaption),
  );

  return <div className={className}>{slides}</div>;
}

export interface CarouselStageProps {
  className?: string;
  currentImage: CarouselSlideProps["imageData"];
  nextImage: CarouselSlideProps["imageData"];
  previousImage: CarouselSlideProps["imageData"];
  showCaption?: CarouselSlideProps["showCaption"];
  transition: Transition | null;
  transitionDuration: TransitionDuration;
}

type Transition = "next" | "previous";
type TransitionDuration = 75 | 100 | 150 | 200 | 300 | 500 | 700 | 1_000;

function resolveTransitionClassName(
  transition: Transition | null,
  transitionDuration: TransitionDuration,
) {
  if (transition === null) {
    return "";
  }

  const duration = transitionDurationClassNames[transitionDuration];
  const translation =
    transition === "next" ? "-translate-x-full" : "translate-x-full";
  return resolveClassNames("transform transition", duration, translation);
}

/**
 * Dictionary of transition durations and corresponding tailwindcss class names.
 *
 * Tailwindcss needs to be able to read complete class names at compile time to
 * generate appropriate CSS. Partial string interpolation will not work.
 */
const transitionDurationClassNames = {
  75: "duration-75",
  100: "duration-100",
  150: "duration-150",
  200: "duration-200",
  300: "duration-300",
  500: "duration-500",
  700: "duration-700",
  1_000: "duration-1000",
} as const;

function mapToSlide(
  imageData: CarouselSlideProps["imageData"],
  index: number,
  transition: Transition | null,
  transitionClassName: string,
  showCaption: CarouselSlideProps["showCaption"],
) {
  const className = resolveSlideClassName(
    index,
    transition,
    transitionClassName,
  );

  const sizedImageData = { ...imageData };
  sizedImageData.height = Math.min(imageData.height, 1_024);
  sizedImageData.width = Math.min(imageData.width, 1_024);

  return (
    <CarouselSlide
      className={className}
      imageData={sizedImageData}
      key={index}
      showCaption={!!showCaption}
    />
  );
}

function resolveSlideClassName(
  index: number,
  transition: Transition | null,
  transitionClassName: string,
) {
  const isCurrent = index === CURRENT_SLIDE_INDEX;
  const shouldHide = (isCurrent && transition) || (!isCurrent && !transition);
  const opacity = shouldHide ? "opacity-0" : "";
  const visibility = resolveVisibilityClassName(index, transition);

  return resolveClassNames(
    "relative right-full",
    opacity,
    visibility,
    transitionClassName,
  );
}

function resolveVisibilityClassName(
  slideIndex: number,
  transition: Transition | null,
) {
  switch (slideIndex) {
    case PREVIOUS_SLIDE_INDEX:
      return transition === "previous" ? "" : "invisible";
    case CURRENT_SLIDE_INDEX:
      return "";
    case NEXT_SLIDE_INDEX:
      return transition === "next" ? "" : "invisible";
    default:
      throw new RangeError(`slideIndex "${slideIndex}" is out of bounds`);
  }
}

const PREVIOUS_SLIDE_INDEX = 0;
const CURRENT_SLIDE_INDEX = 1;
const NEXT_SLIDE_INDEX = 2;
