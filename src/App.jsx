import selfPortrait from "content/self portrait.png";
import logo from "./content/logo.svg";
import React from "react";
import { GitHubLogo, TwitterLogo, YoutubeLogo } from "./content/SVGlogos";
import Canvas from "components/Canvas";
import { draw } from "scripts/DustParticles";

let links = {
  github: "https://github.com/PlayCreatively",
  twitter: "https://twitter.com/PlayCreatively",
  youtube: "https://www.youtube.com/channel/UCXUqdm8g8983N53-IEdkm0A",
};

function App() {
  return (
    <div className="App Scroll-bar" style={{ position: "relative" }}>
      <header
        className="App-header"
        style={{ flexDirection: "row", position: "relative" }}
      >
        <div
          style={{
            flexDirection: "column",
            height: "8em",
          }}
        >
          <img
            className="avatar"
            src={selfPortrait}
            height="400px"
            // style={{ imageRendering: "pixelated" }}
          ></img>
          <h1 className="Name-header">
            Alexander Freyr Þorgeirsson
            <div id="links">
              <a href={links.github}>
                <GitHubLogo />
              </a>
              <a href={links.twitter}>
                <TwitterLogo />
              </a>
              <a href={links.youtube}>
                <YoutubeLogo />
              </a>
            </div>
          </h1>
        </div>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>
      <Canvas id="bg" draw={draw} />
    </div>
  );
}

export default App;