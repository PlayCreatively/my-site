import React, { useState, useEffect, useRef } from "react";
import Swiper from "swiper";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "swiper-container": any;
      "swiper-slide": any;
      // add other swiper elements here
    }
  }
}

interface SwiperProps {}

const ProjectsSwiper: React.FC<SwiperProps> = ({ children, ...props }) => {
  const [isMobile, setIsMobile] = useState(false);
  const swiperRef = useRef<Swiper | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [swiperRef]);

  return (
    <swiper-container
      ref={swiperRef}
      speed="500"
      navigation={!isMobile}
      pagination={true}
      // scrollbar={true}
      pagination-clickable={true}
      keyboard={true}
      centeredSlides={true}
      slides-per-view="auto"
      {...props}
      style={{
        "--swiper-theme-color": "var(--main-color)",
        "--swiper-navigation-size": "30px",
        "--swiper-navigation-sides-offset": 0,
      }}
    >
      {children}
    </swiper-container>
  );
};

export default ProjectsSwiper;
