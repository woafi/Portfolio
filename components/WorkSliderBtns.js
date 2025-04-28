"use client"

import { useSwiper } from "swiper/react"
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi"
import { useEffect, useRef } from "react"

function WorkSliderBtns({ containerStyle, btnStyles, iconStyles }) {
  const swiper = useSwiper();
  const intervalRef = useRef(null);
  
  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      if (swiper.isEnd) {
        swiper.slideTo(0); // Go back to first slide if at end
      } else {
        swiper.slideNext();
      }
    }, 5000);
  };
  
  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
  
  const handlePrev = () => {
    stopInterval();
    if (swiper.isBeginning) {
      swiper.slideTo(swiper.slides.length - 1); // Go to last slide if at beginning
    } else {
      swiper.slidePrev();
    }
    startInterval();
  };
  
  const handleNext = () => {
    stopInterval();
    if (swiper.isEnd) {
      swiper.slideTo(0); // Go to first slide if at end
    } else {
      swiper.slideNext();
    }
    startInterval();
  };

  useEffect(() => {
    startInterval();
    return () => stopInterval();
  }, [swiper]);

  return (
    <div className={containerStyle}>
      <button className={btnStyles} onClick={handlePrev}>
        <PiCaretLeftBold className={iconStyles}/>
      </button>
      <button className={btnStyles} onClick={handleNext}>
        <PiCaretRightBold className={iconStyles}/>
      </button>
    </div>
  )
}

export default WorkSliderBtns