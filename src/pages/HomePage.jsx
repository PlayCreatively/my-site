import selfPortrait from "../content/self portrait.png";
import {
  GitHubLogo,
  TwitterLogo,
  YoutubeLogo,
  ItchLogo,
} from "../content/SVGlogos";
import Canvas from "../components/Canvas";
import { draw } from "../scripts/DustParticles";
// import ImageGallery from "../components/ImageGallery";
import GetImages from "../components/GetImages";
import Chapter from "../components/reactComponents/Chapter";
import ProjectsData from "../content/ProjectsData.json";
import Project from "../components/Project";
import React, { useState, useEffect } from "react";
// import PDF from "../components/reactComponents/PDF";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const links = {
  github: "https://github.com/PlayCreatively",
  twitter: "https://twitter.com/PlayCreatively",
  youtube: "https://www.youtube.com/channel/UCXUqdm8g8983N53-IEdkm0A",
  itch: "https://playcreatively.itch.io/",
};

function PromiseHandler({ promise, children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    promise()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [promise]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return children(data ?? []);
}

// const ProjectTitleToID = (title) => {
//   return title
//     .substring(0, title.indexOf(" ("))
//     .replaceAll(" ", "-")
//     .toLowerCase();
// };

function HomePage() {
  return (
    <div className="App Scroll-bar">
      <header className="App-header default-width">
        <div className="header-container">
          <img className="avatar" src="me.webp" />
          <div className="header-intro-container">
            <h1 className="name-header">
              Alexander Freyr{" "}
              <a href="https://en.wikipedia.org/wiki/Thorn_(letter)">Þ</a>
              orgeirsson
            </h1>
            <div className="below-header-name">
              <div id="links">
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubLogo />
                </a>
                {/* <a href={links.twitter}>
                <TwitterLogo />
              </a>
              <a href={links.youtube}>
                <YoutubeLogo />
              </a> */}
                <a href={links.itch} target="_blank" rel="noopener noreferrer">
                  <ItchLogo />
                </a>
              </div>
              <p className="header-description">
                <a className="header-description-highlight">Programmer</a>
                {", hobby "}
                <a href="#drawings" className="header-description-highlight">
                  artist
                </a>
                {" and Life long creator, "}
                {/* {"—passionate about games as sandboxes for learning."} */}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* <PDF url="Work-logs/Visual-Work-Log.pdf" /> */}
      {/* <Canvas id="bg" draw={draw} /> */}
      <div>
        <Swiper>
          {ProjectsData.map((project) => (
            <SwiperSlide
              // data-hash={ProjectTitleCleanUp(project.title)}
              // id={ProjectTitleCleanUp(project.title)}
              key={project.title}
            >
              <Project {...project} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div id="Drawings">
        <Swiper
          space-between="30"
          centered-slides={true}
          slides-per-view="1"
          loop={true}
          // hash-navigation-watch-state="true"
        >
          <PromiseHandler promise={GetImages}>
            {(images) =>
              images.map((image, i) => (
                <SwiperSlide
                  // data-hash={"img-" + i}
                  key={"img-" + i}
                  style={{
                    alignSelf: "center",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={image}
                    alt={`Drawing ${i}`}
                    style={{
                      maxHeight: "100vh",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "0.3vw",
                    }}
                  />
                </SwiperSlide>
              ))
            }
          </PromiseHandler>
        </Swiper>
        {/* <ImageGallery urls={GetImages()} /> */}
      </div>
    </div>
  );
}

export default HomePage;
