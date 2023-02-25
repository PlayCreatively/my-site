import { useState } from "react";

export default function ImageGallery({
  urls,
}: {
  urls: string[] | Promise<string[]>;
}) {
  const [index, setIndex] = useState(0);
  const [URLs, setURLs] = useState(Array.isArray(urls) ? urls : null);

  function Button({
    side,
    length,
  }: {
    side: "left" | "right";
    length: number;
  }) {
    return (
      <div
        className={"button " + side + "-button"}
        onClick={(ev) =>
          setIndex((index + (side == "left" ? -1 : 1) + length) % length)
        }
      >
        <div className="button-icon">{side == "left" ? "<" : ">"}</div>
      </div>
    );
  }

  // localStorage.setItem("imageURLs", JSON.stringify(urls));

  if (urls instanceof Promise) 
    urls.then((v) => setURLs(v)).catch((err) => console.error(err));
  if (URLs === null) return <></>;
  else
    return (
      <div className="ImageGallery">
        <Button side="left" length={URLs.length}></Button>
        <img src={URLs[index]}></img>
        <Button side="right" length={URLs.length}></Button>
      </div>
    );
}
