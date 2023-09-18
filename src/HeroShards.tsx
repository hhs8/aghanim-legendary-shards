import { cleanseName } from "./helper";
import { isDesktop, isMobileOnly } from "react-device-detect";

interface HeroShardsProps {
  hero: string;
  allHeroes: Function;
}

const cdnSkillImageLink =
  "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/";

export default function HeroShards(props: HeroShardsProps) {
  if (!props.hero) {
    return <></>;
  }

  let heroSkills = props.allHeroes(props.hero);
  let skillNames = Object.keys(heroSkills);

  const renderShards = (skill: string, show: boolean) => {
    if (!show) {
      return;
    }

    return (
      <>
        {Object.keys(heroSkills[skill]).map((shard, shardIdx) => {
          return (
            <div key={shardIdx} className="">
              <div className="text-xl uppercase lg:text-2xl legendary-shard-name font-skill">
                {shard}
              </div>
              <div className="pb-2 text-sm lg:text-base font-description">
                {heroSkills[skill][shard]}
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      {skillNames.map((skill, idx) => {
        let heroName = cleanseName(props.hero);

        // sand king is an odd case
        // where it's hero name has an underscore
        // but the underscore is removed from hero name when used for ability name
        if (heroName == "sand_king") {
          heroName = "sandking";
        }
        const skillImg = heroName + "_" + cleanseName(skill) + ".png";
        const skillImgClass = isDesktop
          ? "legendary-shard"
          : "legendary-shard legendary-shard-mobile";
        const skillNameClass = isDesktop
          ? ""
          : "flex items-center justify-center";

        return (
          <div key={idx} className="my-8 text-base ">
            <div className="flex">
              <div className="inline mr-6 lg:block">
                <img
                  className={skillImgClass}
                  src={cdnSkillImageLink + skillImg}
                />
              </div>
              <div className={skillNameClass}>
                <div className="text-xl text-gray-200 uppercase font-skill">
                  {skill}
                </div>
                {renderShards(skill, isDesktop)}
              </div>
            </div>

            <div className="mt-6">{renderShards(skill, isMobileOnly)}</div>
          </div>
        );
      })}
    </>
  );
}
