export default async function getImages(): Promise<string[] | null> {
  const username = "PlayCreatively";
  const repo = "Visual-Portfolio";
  const path = "Visual Portfolio/Artwork";
  const url = `https://api.github.com/repos/${username}/${repo}/contents/${path}`;

  const res  = await fetch(url);
  const data = await res.json();

  if (Array.isArray(data)) {
    return data
      .filter(
        (item: { type: string; name: string }) =>
          item.type === "file" &&
          item.name.match(/\.(png|jpe?g|gif|avif|webp)$/i)
      )
      .map((item) => item.download_url);
  }

  return null;
}
