import { useEffect, useState } from "react";
import { cleanseName } from "./utils/helper";
import { isDesktop, isMobileOnly } from "react-device-detect";

interface HeroShardsProps {
  hero: string;
  allHeroes: Function;
}

const cdnSkillImageLink =
  "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/";

const replaceStar = (skillName: string) => {
  if (skillName.indexOf("⭐") == -1) {
    return skillName;
  }

  const processedSkill = skillName.replace("⭐", "");
  return (
    <>
      {processedSkill}
      <img
        width="26"
        height="26"
        className="pb-2 pl-2"
        src="/src/data/star.svg"
      ></img>
    </>
  );
};

export default function HeroShards(props: HeroShardsProps) {
  const [synergy, setSynergy] = useState(false);

  useEffect(() => {
    setSynergy(false);
  }, [props.hero]);

  const toggleSynergy = () => {
    setSynergy(!synergy);
  };

  if (!props.hero) {
    return <></>;
  }

  let heroSkills = props.allHeroes(props.hero);
  let skillNames = Object.keys(heroSkills);

  const filteredSkillNames = () => {
    if (!synergy) {
      return skillNames;
    }
    return skillNames.filter((skill, _) => {
      return JSON.stringify(heroSkills[skill]).indexOf("⭐") > -1;
    });
  };

  const filteredShards = (skill: string) => {
    if (!synergy) {
      return Object.keys(heroSkills[skill]);
    }
    return Object.keys(heroSkills[skill]).filter((shard, _) => {
      return shard.indexOf("⭐") > -1;
    });
  };

  const renderSynergyOnly = () => {
    if (JSON.stringify(heroSkills).includes("⭐")) {
      return (
        <label htmlFor="synergy-toggle" className="text-orange-200">
          <input
            id="synergy-toggle"
            type="checkbox"
            checked={synergy}
            onChange={toggleSynergy}
            className="w-4 h-4 mx-2 mb-1 text-orange-400 bg-orange-200 rounded-sm ring-0 focus:ring-offset-0 checked:ring-offset-0 checked:ring-0 focus:ring-0"
          ></input>
          Show synergy only
        </label>
      );
    }
  };

  const renderShards = (skill: string, show: boolean) => {
    if (!show) {
      return;
    }

    return (
      <>
        {filteredShards(skill).map((shard, shardIdx) => {
          return (
            <div key={shardIdx}>
              <div className="flex text-xl uppercase lg:text-2xl legendary-shard-name font-skill">
                {replaceStar(shard)}
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
    <div>
      <div className="text-lg text-center text-neutral-50 font-description">
        {renderSynergyOnly()}
      </div>
      {filteredSkillNames().map((skill, idx) => {
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
          <div key={idx} className="m-6 text-base">
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
    </div>
  );
}
