import selfPortrait from "content/self portrait.png";
import {
  GitHubLogo,
  TwitterLogo,
  YoutubeLogo,
  ItchLogo,
} from "../content/SVGlogos";
import Canvas from "components/Canvas";
import { draw } from "scripts/DustParticles";
import ImageGallery from "components/ImageGallery";
import GetImages from "components/GetImages";
import Chapter from "components/reactComponents/Chapter";
import ReactSwiper from "components/ReactSwiper";
import ProjectsData from "content/ProjectsData.json";
import Project from "components/Project";
import { register as swiperRegister } from "swiper/element/bundle";
import React, { useState, useEffect } from "react";

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

// register Swiper custom elements
swiperRegister();

function HomePage() {
  return (
    <div className="App Scroll-bar">
      <header className="App-header default-width">
        <div>
          <img className="avatar" src="me.jpg" />
          <h1 className="Name-header">
            Alexander Freyr Þorgeirsson
            <div id="links">
              <a href={links.github}>
                <GitHubLogo />
              </a>
              {/* <a href={links.twitter}>
                <TwitterLogo />
              </a>
              <a href={links.youtube}>
                <YoutubeLogo />
              </a> */}
              <a href={links.itch}>
                <ItchLogo />
              </a>
            </div>
          </h1>
        </div>
      </header>
      {/* <Canvas id="bg" draw={draw} /> */}
      <div className="default-width" style={{ maxWidth: "calc(96vw - 30px)" }}>
        <ReactSwiper>
          {ProjectsData.map((project) => (
            <swiper-slide
              data-hash={project.title
                .substring(0, project.title.indexOf(" ("))
                .replaceAll(" ", "-")
                .toLowerCase()}
              key={project.title}
            >
              <Project {...project} />
            </swiper-slide>
          ))}
        </ReactSwiper>
      </div>
      <Chapter title="Drawings">
        <ReactSwiper
          space-between="30"
          centered-slides={true}
          slides-per-view="1"
        >
          <PromiseHandler promise={GetImages}>
            {(images) =>
              images.map((image, i) => (
                <swiper-slide
                  data-hash={"img-" + i}
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
                      objectFit: "cover",
                      borderRadius: "0.3vw",
                    }}
                  />
                </swiper-slide>
              ))
            }
          </PromiseHandler>
        </ReactSwiper>
        <style>
          {`
          .swiper img {
  max-width: 100%;
  max-height: 100vh;
  object-fit: cover;
  border-radius: 0.3vw;
}
          }
        `}
        </style>
        {/* <ImageGallery urls={GetImages()} /> */}
      </Chapter>
    </div>
  );
}

export default HomePage;
