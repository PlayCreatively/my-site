import React from "react";
import { DownArrow } from "../content/down-arrow.jsx";
import { ItchLogo, GitHubLogo } from "../content/SVGlogos.jsx";

interface ProjectProps {
  video?: string;
  image?: string;
  title: string;
  tags: string[];
  description: string;
  contributions: string[] | [{ title: string; description: string }];
  downloadLinks?: {
    itch: string;
    github: string;
    appStore: string;
    googlePlay: string;
  };
}

const Project: React.FC<ProjectProps> = ({
  video,
  image,
  title,
  tags,
  description,
  contributions,
  downloadLinks,
}) => {
  const visualElement = video ? (
    <video loop muted autoPlay src={video} className="game-image" />
  ) : (
    <img src={image} className="game-image" />
  );

  const [expandedIndex, setExpandedIndex] = React.useState<number>(-1);

  const handleExpand = (index: number) =>
    setExpandedIndex(expandedIndex === index ? -1 : index);

  return (
    <div className="project-container">
      <div>
        <div className="image-section">{visualElement}</div>
        <div className="text-section">
          <h2>{title}</h2>
          <div className="tags">
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <p>{description}</p>
          <ul>
            {contributions.map(
              (
                contribution: string | { title: string; description: string },
                index: number
              ) => (
                <>
                  <li
                    key={index}
                    onClick={
                      typeof contribution === "string"
                        ? undefined
                        : () => handleExpand(index)
                    }
                    className={
                      typeof contribution === "string"
                        ? undefined
                        : "expandable" +
                          (expandedIndex === index ? " expanded" : "")
                    }
                  >
                    {typeof contribution === "string" ? (
                      <span>{contribution}</span>
                    ) : (
                      <>
                        <span>{contribution.title}</span>
                        {DownArrow}
                      </>
                    )}
                  </li>
                  {typeof contribution !== "string" ? (
                    expandedIndex === index && <p>{contribution.description}</p>
                  ) : (
                    <></>
                  )}
                </>
              )
            )}
          </ul>
          {downloadLinks && (
            <div className="download">
              {downloadLinks.itch && (
                <a href={downloadLinks.itch}>{ItchLogo()}</a>
              )}
              {downloadLinks.github && (
                <a href={downloadLinks.github}>{GitHubLogo()}</a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
