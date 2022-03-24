import RenderHeroes from "./RenderHeroes";

interface RenderHeroTypesProps {
  attributes: string[],
  heroesByAttributes: Array<Array<string>>,
  setCurHero: Function
}

export default function RenderHeroTypes(props: RenderHeroTypesProps) {
  return (
    <>
    {
      props.heroesByAttributes.map((heroes: string[], idx) => {
        const curAttr = props.attributes[idx];
        const attrImg = "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_" + curAttr + ".png";
        const flexId = curAttr + "-heroes";

        return (
        <div key={idx}>
          <div className="justify-center inline-block mt-6 mb-4">
            <img src={attrImg} className="inline mx-3" width={'auto'} height={'auto'} />
            <span className='font-medium align-text-top'>{curAttr.toUpperCase()}</span>
          </div>
          <div id={flexId} className="flex flex-wrap justify-center gap-3 mb-4" style={{ minWidth: '100%' }}>
            <RenderHeroes setCurHero={props.setCurHero} heroes={heroes}/>
          </div>
        </div>
        )
      })
    }
    </>
  )
}