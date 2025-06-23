import React from "react";
import { DownArrow } from "../content/down-arrow.jsx";
import { ItchLogo, GitHubLogo, HomeLogo } from "../content/SVGlogos.jsx";
import { marked } from "marked";
import PDF from "./reactComponents/PDF";

interface ProjectProps {
  video?: string;
  image?: string;
  title: string;
  roles: string[];
  tags: string[];
  description: string;
  subSections?: [{ title: string; image: string; description: string }];
  pdf?: string;
  contributions: string[] | [{ title: string; description: string }];
  downloadLinks?: {
    github: string;
    itch: string;
  };
}

const Project: React.FC<ProjectProps> = ({
  video,
  image,
  title,
  tags,
  description,
  subSections,
  pdf,
  roles,
  contributions,
  downloadLinks,
}) => {
  const [expandedIndex, setExpandedIndex] = React.useState<number>(-1);

  const visualElement =
    expandedIndex === -1 ? (
      video ? (
        <video loop muted autoPlay src={video} className="game-image" />
      ) : (
        <img src={image} className="game-image" />
      )
    ) : (
      <img src={subSections?.[expandedIndex]?.image} className="game-image" />
    );
  const GetSubsectionContent = (id: number) => {
    if (id === subSections?.length && pdf) return <PDF url={pdf} />;

    const subSection = subSections?.[id];

    const content = {
      title: subSection?.title ?? title,
      description: subSection?.description ?? description,
    };

    return (
      <>
        {visualElement}
        <div className="text-section">
          <h2>{content.title}</h2>
          {id === -1 ? (
            <div className="tags">
              {roles.map((role, index) => (
                <span key={index + 1} className="tag role-tag">
                  {role}
                </span>
              ))}
              <span className="divider"></span>
              {tags.map((tag, index) => (
                <span key={index + 1} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <></>
          )}
          <div
            className="text"
            dangerouslySetInnerHTML={{
              __html: marked.parse(content.description, { breaks: true }),
            }}
          />
          {/* <ul>
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
                      expandedIndex === index && (
                        <p>{contribution.description}</p>
                      )
                    ) : (
                      <></>
                    )}
                  </>
                )
              )}
            </ul> */}
          {downloadLinks && (
            <div className="download">
              {downloadLinks.github && (
                <a href={downloadLinks.github}>{GitHubLogo()}</a>
              )}
              {downloadLinks.itch && (
                <a href={downloadLinks.itch}>{ItchLogo()}</a>
              )}
            </div>
          )}
        </div>
      </>
    );
  };

  const handleExpand = (index: number) =>
    setExpandedIndex(expandedIndex === index ? -1 : index);

  const mapContributions = (
    subSections: [{ title: string; description: string }]
  ) =>
    subSections.map((subSection, index: number) => (
      <div
        key={index}
        className={index === expandedIndex ? "active" : ""}
        onClick={() => handleExpand(index)}
      >
        {subSection.title}
      </div>
    ));

  return (
    <div className="project-container">
      <div>
        <div className="sub-sections-menu">
          {subSections !== undefined ? (
            <>
              {HomeLogo({
                key: -1,
                className: expandedIndex == -1 ? "active" : undefined,
                onClick: () => handleExpand(-1),
              })}
              {mapContributions(subSections)}

              <span
                className={expandedIndex == -1 ? "active" : undefined}
                onClick={() => handleExpand(subSections.length)}
              >
                📁
              </span>
            </>
          ) : (
            <></>
          )}
        </div>
        <div>{GetSubsectionContent(expandedIndex)}</div>
      </div>
    </div>
  );
};

export default Project;
