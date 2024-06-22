import { useState } from "react";

export default function ImageFullGallery({
  urls,
}: {
  urls: string[] | Promise<string[]>;
}) {
  // const [index, setIndex] = useState(0);
  const [URLs, setURLs] = useState(Array.isArray(urls) ? urls : null);

  // localStorage.setItem("imageURLs", JSON.stringify(urls));

  if (urls instanceof Promise)
    urls.then((v) => setURLs(v)).catch((err) => console.error(err));
  if (URLs === null) return <></>;
  else
    return (
      <div className="ImageFullGallery">
        {URLs.map((url) => (
          <img className="Image" src={url}></img>
        ))}
      </div>
    );
}
