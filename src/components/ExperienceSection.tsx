import TagGroup, { ExperienceTag } from "./reactComponents/TagGroup";

const ExperienceSection = () => {
  const CreateTagSection = (name: string, tags: ExperienceTag[]) => (
    <div>
      <div style={{ width: "3em", textAlign: "left" }}>{name}</div>

      <TagGroup
        tags={tags}
        //"#0072ff2e"
        colors={["#a88536", "#00ff292e", "#ff00652e"]}
      ></TagGroup>
    </div>
  );

  const CreateAll = () =>
    Object.keys(experienceValues).map((key) =>
      CreateTagSection(key, experienceValues[key])
    );

  return <div className="ExperienceSection">{CreateAll()}</div>;
};

export default ExperienceSection;

const experienceValues = {
  Lang: [
    {
      name: "C#",
      experience: 0,
    },
    {
      name: "JS/TS",
      experience: 1,
    },
    {
      name: "Python",
      experience: 1,
    },
    {
      name: "Lua",
      experience: 1,
    },
    {
      name: "C++",
      experience: 2,
    },
  ],
  Tool: [
    {
      name: "Blender",
      experience: 2,
    },
    {
      name: "Unity",
      experience: 0,
    },
    {
      name: "Godot",
      experience: 2,
    },
    {
      name: "MonoGame",
      experience: 1,
    },
    {
      name: "Photoshop",
      experience: 0,
    },
    {
      name: "React",
      experience: 1,
    },
    {
      name: "OpenGL",
      experience: 2,
    },
  ],
};
