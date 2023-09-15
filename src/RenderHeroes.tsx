import { cleanseName } from "./helper";

interface RenderHeroesProps {
  setCurHero: Function;
  heroes: string[];
  className?: string;
}

const cdnHeroImageLink =
  "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/";

export default function HeroImage(props: RenderHeroesProps) {
  const loadImage = (hero: string, index: number) => {
    let imgurl = cdnHeroImageLink + cleanseName(hero) + ".png";
    return (
      <a
        key={index}
        style={{ backgroundImage: `url("${imgurl}")` }}
        className={"heroes-avatar " + props.className}
        onClick={() => props.setCurHero(hero)}
      />
    );
  };

  return (
    <>
      {props.heroes.map((heroName: string, idx) => {
        return loadImage(heroName, idx);
      })}
    </>
  );
}
