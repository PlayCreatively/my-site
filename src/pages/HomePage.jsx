import selfPortrait from "content/self portrait.png";
import me from "content/me.jpg";
import ProjectsData from "content/ProjectsData.json";
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
import Project from "components/Project";

const links = {
  github: "https://github.com/PlayCreatively",
  twitter: "https://twitter.com/PlayCreatively",
  youtube: "https://www.youtube.com/channel/UCXUqdm8g8983N53-IEdkm0A",
  itch: "https://playcreatively.itch.io/",
};

function HomePage() {
  return (
    <div className="App Scroll-bar">
      <header className="App-header">
        <div>
          <img className="avatar" src={me} height="400px" />
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
      {ProjectsData.map((project) => (
        <Project key={project.title} {...project} />
      ))}
      <Chapter title="Drawings">
        <ImageGallery urls={GetImages()} />
      </Chapter>
    </div>
  );
}

export default HomePage;
