export default async function GetImages(): Promise<string[]> {
  const fetch = require("node-fetch");

  const username = "PlayCreatively";
  const repo = "Visual-Portfolio";
  const path = "Visual Portfolio/Artwork";

  const url = `https://api.github.com/repos/${username}/${repo}/contents/${path}`;

  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        return data
          .filter(
            (item: { type: string; name: string }) =>
              item.type === "file" &&
              item.name.match(/\.(png|jpg|jpeg|gif|avif|webp)$/)
          )
          .map((item) => item.download_url);
      } else {
        return null;
      }
    });
}
