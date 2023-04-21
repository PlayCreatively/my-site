import { useState } from "react";

export default function ImageGallery({
  urls,
}: {
  urls: string[] | Promise<string[]>;
}) {
  const [index, setIndex] = useState(0);
  const [URLs, setURLs] = useState(Array.isArray(urls) ? urls : null);

  function Button({ side, URLs }: { side: "left" | "right"; URLs: string[] }) {
    const length = URLs.length;
    return (
      <div
        className={"button " + side + "-button"}
        onClick={(ev) => {
          const swipeDir = side == "left" ? -1 : 1;
          new Image().src = URLs[index + swipeDir * 2];
          setIndex((index + swipeDir + length) % length);
        }}
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
      <div>
        <div className="ImageGallery">
          <Button side="left" URLs={URLs}></Button>
          <img src={URLs[index]}></img>
          <Button side="right" URLs={URLs}></Button>
        </div>
        <div className="GalleryText">
          {index+1}/{URLs.length}

        </div>
      </div>
    );
}
