import { cleanseName } from "./helper";

interface HeroShardsProps {
  hero: string;
  allHeroes: Function;
}

export default function HeroShards(props: HeroShardsProps) {
  if (!props.hero) {
    return <></>;
  }
  let heroSkills = props.allHeroes(props.hero);
  let skillNames = Object.keys(heroSkills);
  return (
    <>
      {skillNames.map((skill, idx) => {
        let heroName = cleanseName(props.hero);
        if (heroName == "sand_king") {
          heroName = "sandking";
        }
        const skillImg = heroName + "_" + cleanseName(skill) + ".png";

        return (
          <div key={idx} className="flex mb-8 text-base">
            <div className="mr-6 text-xl font-semibold uppercase lg:mr-12">
              <img
                className="legendary-shard"
                src={
                  "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/" +
                  skillImg
                }
              />
            </div>
            <div>
              <div className="inline-block px-2 mb-1 text-xl font-semibold uppercase bg-gray-500 rounded-md">
                {skill}
              </div>
              {Object.keys(heroSkills[skill]).map((shard, shardIdx) => {
                return (
                  <div key={shardIdx} className="">
                    <div className="text-xl font-semibold legendary-shard-name">
                      {shard}
                    </div>
                    <div>{heroSkills[skill][shard]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
