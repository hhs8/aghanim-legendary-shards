import { useState, useEffect } from 'react'
import legendaryJSON from '../data/legendary.json'
import './App.css'

const legendary : { [key: string] : any } = legendaryJSON;

function App() {
  const [curHero, setCurHero] = useState("")
  const [popupFlag, setPopupFlag] = useState(false)

  /**
   * HOOKS
   */
  useEffect(() => {
    // console.log(curHero, '- Has changed')
    if (curHero) {
      setPopupFlag(true)
    }
  }, [curHero])

  const attributes = Object.keys(legendary);
  const heroes = attributes.map(attr => {
    return Object.keys(legendary[attr]);
  });
  const allHeroes = (hr: string) => {
    const heroObj : { [key: string] : any } = {};
    attributes.forEach(attr => {
      Object.assign(heroObj, legendary[attr]);
    })
    return heroObj[hr];
  }

  /**
   * METHODS
   */
  const nameTransform : { [key: string] : string } = {
    "queen_of_pain": "queenofpain",
    "magnus": "magnataur",
    "starbreaker": "fire_wreath",
    "frost_blast": "frost_nova",
    "moon_glaives": "moon_glaive",
    "omnislash": "omni_slash",
    "gust": "wave_of_silence",
    "skeleton_walk": "wind_walk",
    "heavenly_grace": "repel",
    "spear_of_mars": "spear"
  }
  const cleanseName = (hero: string) => {
    let name = hero.toLowerCase().replaceAll(" ", "_");
    name = name.replaceAll("'", "");
    name = name.replaceAll("!", "");

    if (nameTransform[name] != undefined) {
      name = nameTransform[name];
    }
    return name;
  }
  const loadImage = (hero: string) => {
    let imgurl = "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/" + cleanseName(hero) + ".png";
    return <a style={{ backgroundImage: `url("${imgurl}")` }} className="heroes-avatar" onClick={() => setCurHero(hero)} />;
  }

  const loadImages = (heroattr: string[]) => {
    return heroattr.map(heroName => {
      return loadImage(heroName);
    })
  }

  const popupControl = () => {
    let className = "aghanim-popup";
    if (popupFlag) {
      className += " aghanim-popup-show";
    }
    return className;
  }

  const closePopup = () => {
    setCurHero("");
    setPopupFlag(false);
  }

  const loadShards = (hero: string) => {
    if (!hero) {
      return ""
    }
    let heroSkills = allHeroes(curHero);
    let skillNames = Object.keys(heroSkills);
    return skillNames.map(skill => {
      let heroName = cleanseName(curHero);
      if (heroName=="sand_king") {
        heroName = "sandking";
      }
      const skillImg = heroName + "_" + cleanseName(skill) + ".png"

      return <div className='flex mb-8 text-base'>
        <div className='mr-6 text-xl font-semibold uppercase lg:mr-12'>
          <img className="legendary-shard" src={"https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/" + skillImg}/>
          
        </div>
        <div>
          <div className='inline-block px-2 mb-1 text-xl font-semibold uppercase bg-gray-500 rounded-md'>{skill}</div>
          {
            Object.keys(heroSkills[skill]).map(shard => {
              return <div className=''>
                <div className='text-xl font-semibold legendary-shard-name'>{shard}</div>
                <div>{ heroSkills[skill][shard] }</div>
              </div>
            })
          }
        </div>
      </div>
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePopup();
    }
  })

  /**
   * Main app
   */
  return (
    <div className="App">
      <header className="App-header">
        <div className="Banner" />
        <div className="mx-auto App-content">
          {
            heroes.map((heroattr, idx) => {
              const curAttr = attributes[idx];
              const attrImg = "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_" + curAttr + ".png";
              const flexId = curAttr + "-heroes";

              return <div>
                <div className="justify-center inline-block mt-6 mb-4">
                  <img src={attrImg} className="inline mx-3" width={'auto'} height={'auto'} />
                  <span className='font-medium align-text-top'>{curAttr.toUpperCase()}</span>
                </div>
                <div id={flexId} className="flex flex-wrap justify-center gap-3 mb-4" style={{ minWidth: '100%' }}>
                  {
                    loadImages(heroattr)
                  }
                </div>
              </div>
            })
          }
        </div>
        <div className={popupControl()}>
          <div className='absolute z-10 aghanim-popup-overlay' onClick={ closePopup }/>
          <div className='absolute z-20 w-screen h-screen p-8'>
            <div className="z-20 inline-block text-left bg-gray-700 rounded-lg aghanim-popup-content">
              <div className='p-6 pb-0 text-left shard-contents'>{loadShards(curHero)}</div>
              <div className='py-3 text-center underline align-middle cursor-pointer' onClick={ closePopup }>CLOSE</div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default App
