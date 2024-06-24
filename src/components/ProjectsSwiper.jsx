import React, { useState, useEffect } from "react";
import { register as swiperRegister } from "swiper/element/bundle";
import ProjectsData from "content/ProjectsData.json";
import Project from "components/Project";

const ProjectsSwiper = () => {
  // register Swiper custom elements
  swiperRegister();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <swiper-container
      speed="500"
      navigation={!isMobile}
      pagination="true"
      // scrollbar="true"
      hash-navigation-watch-state="true"
      pagination-clickable="true"
      keyboard="true"
      style={{
        "--swiper-theme-color": "var(--main-color)",
        "--swiper-navigation-size": "30px",
        "--swiper-navigation-sides-offset": 0,
      }}
    >
      {ProjectsData.map((project) => (
        <swiper-slide
          data-hash={project.title
            .substring(0, project.title.indexOf(" ("))
            .replaceAll(" ", "-")}
        >
          <Project key={project.title} {...project} />
        </swiper-slide>
      ))}
    </swiper-container>
  );
};

export default ProjectsSwiper;
