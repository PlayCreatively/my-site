import React, { useEffect, useRef, useState } from "react";

// ➊ Core styles + any feature CSS you need
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// ➋ React wrapper & modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";

// ➌ Runtime type for the ref
import type { Swiper as SwiperInstance } from "swiper";

interface ProjectsSwiperProps {
  /** Pass <div>…</div> children and we wrap each in a slide */
  children?: React.ReactNode;
}

const ProjectsSwiper: React.FC<ProjectsSwiperProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const swiperRef = useRef<SwiperInstance | null>(null);

  /* ---------- track viewport width for nav arrows ---------- */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1000);
    window.addEventListener("resize", handleResize);
    handleResize(); // run once on mount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Swiper
      /* core settings --------------------------------------- */
      modules={[Navigation, Pagination, Keyboard]}
      onSwiper={(instance) => (swiperRef.current = instance)}
      speed={500}
      centeredSlides
      slidesPerView="auto"
      /* feature toggles ------------------------------------- */
      navigation={!isMobile}
      pagination={{ clickable: true }}
      keyboard={{ enabled: true }}
      /* CSS vars (need a cast because they’re custom props) -- */
      style={
        {
          "--swiper-theme-color": "var(--main-color)",
          "--swiper-navigation-size": "30px",
          "--swiper-navigation-sides-offset": "0px",
        } as React.CSSProperties
      }
    >
      {React.Children.map(children, (child, i) => (
        <SwiperSlide key={i}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProjectsSwiper;
