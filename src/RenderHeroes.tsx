import { cleanseName } from "./helper";

interface RenderHeroesProps {
  setCurHero: Function,
  heroes: string[]
}

export default function HeroImage(props: RenderHeroesProps) {
  const loadImage = (hero: string, index: number) => {
    let imgurl = "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/" + cleanseName(hero) + ".png";
    return <a key={index} style={{ backgroundImage: `url("${imgurl}")` }} className="heroes-avatar" onClick={() => props.setCurHero(hero)} />;
  }

  return (
    <>
    {
      props.heroes.map((heroName: string, idx) => {
        return loadImage(heroName, idx);
      })
    }
    </>
  );
}