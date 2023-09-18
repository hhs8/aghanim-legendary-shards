import RenderHeroes from "./RenderHeroes";

interface RenderHeroTypesProps {
  attributes: string[];
  heroesByAttributes: Array<Array<string>>;
  setCurHero: Function;
}

const cdnHeroImageLink =
  "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_";

export default function RenderHeroTypes(props: RenderHeroTypesProps) {
  return (
    <>
      {props.heroesByAttributes.map((heroes: string[], idx) => {
        const curAttr = props.attributes[idx];
        const attrImg = cdnHeroImageLink + curAttr + ".png";
        const flexId = curAttr + "-heroes";

        return (
          <div key={idx} className="my-8">
            <div className="flex my-4 attribute-name">
              <div className="flex-auto" />
              <img
                src={attrImg}
                className="inline mx-3"
                width={"auto"}
                height={"auto"}
              />
              <div className="my-2 text-2xl font-trajan-pro">
                {curAttr.toUpperCase()}
              </div>
              <div className="flex-auto" />
            </div>
            <div
              id={flexId}
              className="flex flex-wrap justify-center gap-3"
              style={{ minWidth: "100%" }}
            >
              <RenderHeroes setCurHero={props.setCurHero} heroes={heroes} />
            </div>
          </div>
        );
      })}
    </>
  );
}
