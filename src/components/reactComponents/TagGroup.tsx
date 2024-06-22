import _ from "lodash";

// Example usage
const numbers = [1, 2, 3, 4, 5];
const sum = _.sum(numbers);
console.log(sum);

export interface ExperienceTag {
  name: string;
  experience: number;
}

interface ExperienceTagData {
  tags: ExperienceTag[];
  colors?: string[];
}

const TagGroup: React.FC<ExperienceTagData> = ({
  tags,
  colors = ["green", "orange", "red"],
}) => {
  tags = tags.sort((tagA, tagB) => tagA.experience - tagB.experience);
  const d = _.groupBy(tags, (tag) => tag.experience);

  return (
    <div className="TagGroup">
      {_.map(d, (experienceGroup) => (
        <div id={"experience_" + experienceGroup[0].experience}>
          {_.map(experienceGroup, (tag) => (
            <div
              className="Tag"
              key={tag.name}
              style={{ backgroundColor: colors[tag.experience] }}
            >
              {tag.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TagGroup;
