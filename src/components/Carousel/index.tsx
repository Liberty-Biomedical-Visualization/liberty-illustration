"use client";

import {
  type MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import * as array from "@/lib/array";
import resolveClassNames from "@/lib/resolveClassNames";

import CarouselButton from "./Button";
import CarouselStage, { type CarouselStageProps } from "./Stage";

export default function Carousel(props: Readonly<CarouselProps>) {
  const { images, slideDuration, transitionDuration } = props;

  const advanceSlideIntervalId = useRef<number | null>(null);
  const transitionTimeoutId = useRef<number | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [transition, setTransition] =
    useState<CarouselStageProps["transition"]>(null);

  const nextIndex = calculateIndex(currentIndex, +1, images.length);
  const previousIndex = calculateIndex(currentIndex, -1, images.length);

  const changeSlide = useCallback(
    (transition: CarouselStageProps["transition"], index: number) => {
      setTransition(transition);
      setTransitionTimeout(
        transitionDuration,
        index,
        setCurrentIndex,
        setTransition,
        transitionTimeoutId,
      );
    },
    [transitionDuration],
  );

  const advanceSlide = useCallback(
    () => changeSlide("next", nextIndex),
    [changeSlide, nextIndex],
  );

  const regressSlide = () => changeSlide("previous", previousIndex);

  useEffect(
    () =>
      initializeSlideshow(
        advanceSlide,
        advanceSlideIntervalId,
        images.length,
        slideDuration,
      ),
    [advanceSlide, images.length, slideDuration],
  );

  useEffect(() => {
    const cleanUpTransition = () => clearTransitionTimeout(transitionTimeoutId);
    return cleanUpTransition;
  }, []);

  if (images.length === 0) {
    return null;
  }

  const handleNextButtonClick = () =>
    handleButtonClick(
      advanceSlide,
      advanceSlideIntervalId,
      advanceSlide,
      slideDuration,
    );

  const handlePreviousButtonClick = () =>
    handleButtonClick(
      advanceSlide,
      advanceSlideIntervalId,
      regressSlide,
      slideDuration,
    );

  const className = resolveClassNames("flex justify-center", props.className);
  const buttonsAreDisplayed = images.length > 1;
  const buttonsAreDisabled = transition !== null;
  const currentImage = array.atChecked(images, currentIndex);
  const nextImage = array.atChecked(images, nextIndex);
  const previousImage = array.atChecked(images, previousIndex);

  return (
    <div className={className}>
      {buttonsAreDisplayed && (
        <CarouselButton
          className="my-auto"
          disabled={buttonsAreDisabled}
          onClick={handlePreviousButtonClick}
          type="previous"
        />
      )}
      <CarouselStage
        currentImage={currentImage}
        nextImage={nextImage}
        previousImage={previousImage}
        transition={transition}
        transitionDuration={transitionDuration}
      />
      {buttonsAreDisplayed && (
        <CarouselButton
          className="my-auto"
          disabled={buttonsAreDisabled}
          onClick={handleNextButtonClick}
          type="next"
        />
      )}
    </div>
  );
}

export interface CarouselProps {
  className?: string;
  images: readonly CarouselStageProps["currentImage"][];
  slideDuration: number | null;
  transitionDuration: CarouselStageProps["transitionDuration"];
}

function calculateIndex(
  currentIndex: number,
  delta: number,
  indexCount: number,
) {
  return (currentIndex + delta + indexCount) % indexCount;
}

function clearAdvanceSlideInterval(intervalId: TimerId) {
  if (intervalId.current !== null) {
    window.clearInterval(intervalId.current);
    intervalId.current = null;
  }
}

function clearTransitionTimeout(timeoutId: TimerId) {
  if (timeoutId.current !== null) {
    window.clearTimeout(timeoutId.current);
    timeoutId.current = null;
  }
}

function initializeSlideshow(
  advanceSlide: ChangeSlide,
  intervalId: TimerId,
  slideCount: number,
  slideDuration: number | null,
) {
  if (slideCount > 1 && slideDuration !== null) {
    setAdvanceSlideInterval(advanceSlide, intervalId, slideDuration);
    const finalizeSlideshow = () => clearAdvanceSlideInterval(intervalId);
    return finalizeSlideshow;
  }
}

function setAdvanceSlideInterval(
  advanceSlide: ChangeSlide,
  intervalId: TimerId,
  slideDuration: number,
) {
  intervalId.current = window.setInterval(advanceSlide, slideDuration);
}

function setTransitionTimeout(
  duration: number,
  index: number,
  setCurrentIndex: (index: number) => void,
  setTransition: (transition: null) => void,
  timeoutId: TimerId,
) {
  timeoutId.current = window.setTimeout(() => {
    setCurrentIndex(index);
    setTransition(null);
  }, duration);
}

function handleButtonClick(
  advanceSlide: ChangeSlide,
  advanceSlideIntervalId: TimerId,
  changeSlideOnClick: ChangeSlide,
  slideDuration: number | null,
) {
  clearAdvanceSlideInterval(advanceSlideIntervalId);
  changeSlideOnClick();

  if (slideDuration !== null) {
    setAdvanceSlideInterval(
      advanceSlide,
      advanceSlideIntervalId,
      slideDuration,
    );
  }
}

type ChangeSlide = () => void;
type TimerId = MutableRefObject<number | null>;
