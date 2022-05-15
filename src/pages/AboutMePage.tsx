import { ThemeProvider } from "@emotion/react";
import { DEFAULT_THEME } from "@mantine/core";
import Chapter from "components/reactComponents/Chapter";
import DropDown from "components/reactComponents/DropDown";
import ReadMore from "components/reactComponents/ReadMore";
import TableOfContentsFloating from "components/reactComponents/TableOfContentsFloating";
import { readBuilderProgram } from "typescript";
import Scribbles from "../content/scribble";

const AboutMePage = () => {
  let links = { label: "stuff", link: "stuff", order: 0 };

  return (
    <div>
      <TableOfContentsFloating links={[links, links, links]} />

      <Scribbles color="rgba(216, 66, 66, 0.377)" />
      <Chapter title="Aspirations">
        <Chapter title="Education">
          <ReadMore>
            <p>
              One of my many dreams is to make **education easier**. I’ve had to
              go through so many painful and outdated educational experiences
              for which I now have an urging thirst to abolish. One of the many
              things I would want to introduce to formal education is an
              official media hub where videos of other students, explaining the
              same subject in the way they personally understand it, giving
              other students multiple viewpoints on the same matter. Teaching is
              a form of learning and I don’t understand how it’s not part of
              education.
            </p>
          </ReadMore>
        </Chapter>
        {/* <p>
          I’m really interested in **intuitively organizing information** in
          which I attempted to create the ultimate note-taking app which would
          outmatch Notion by a long shot.
        </p> */}
        <Chapter title="Bring Philosophy to Children's Books">
          <p>
            I’m fascinated by symbolism, metaphors, motif and allegories.
            They're liberally used in fairy tales and mythology with
            self-evident success. What makes them so great is their alluring
            nature. They're stories stripped of their specificity and presented
            in a certain hyper-realism, ending up being more real than reality,
            if looked from a certain philosophical frame of reference. So this
            illustrates my attraction to it, it's <b>pure</b>. So its alluring
            quality makes it fit for entertrainment porpuses whilst hiding
            wisdom and holding integrity. Now focusing on children books. fairy
            tales are wisdom presented in fantastical ways. The problem with
            most fairy tales is their incompatability with modern life. There's
            so much wisdom that isn't shared with kids (or even adults)
            Relatively modern fairy tales (with known authors), like Pinocchio,
            little mermaid, ginger bread man Consuming empty material induces
            depression and confusion of meaning "Fairytales do not tell children
            that dragons exist. Children already know that dragons exist.
            Fairytales tell children that dragons can be killed." - G K
            Chesterton through the book’s symbolism, and will later be realized
            by the child later in its life.
          </p>
          <div style={{ display: "flex", flexFlow: "column" }}>
            <iframe
              width={480 * 0.75}
              height={360 * 0.75}
              style={{ borderRadius: "12px" }}
              src="https://www.youtube.com/embed/REjUkEj1O_0?modestbranding=1&rel=0&amp;start=566"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            <iframe
              width={480 * 0.75}
              height={360 * 0.75}
              style={{ borderRadius: "12px" }}
              src="https://www.youtube.com/embed/L9bxcm7hVLU?modestbranding=1&rel=0&amp;start=856"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            <iframe
              width={640 * 0.6}
              height={360 * 0.6}
              style={{ borderRadius: "12px" }}
              src="https://www.youtube.com/embed/fXnef2Ltklg?modestbranding=1&rel=0&amp;start=640"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </Chapter>
      </Chapter>
    </div>
  );
};

export default AboutMePage;
