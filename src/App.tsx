import { useState, useEffect } from "react";
import Announcement from "./Announcement";
import RenderHeroTypes from "./RenderHeroTypes";
import HeroPopup from "./HeroPopup";
import legendaryJSON from "../data/legendary.json";
import "./App.css";
import HeroShards from "./HeroShards";

const legendary: { [key: string]: any } = legendaryJSON;

function App() {
  const [curHero, setCurHero] = useState("");
  const [popupFlag, setPopupFlag] = useState(false);

  /**
   * HOOKS
   */
  useEffect(() => {
    // console.log(curHero, '- Has changed')
    if (curHero) {
      setPopupFlag(true);
    }
  }, [curHero]);

  const attributes = Object.keys(legendary);
  const heroesByAttributes = attributes.map((attr) => {
    return Object.keys(legendary[attr]);
  });
  const allHeroes = (hr: string) => {
    const heroObj: { [key: string]: any } = {};
    attributes.forEach((attr) => {
      Object.assign(heroObj, legendary[attr]);
    });
    return heroObj[hr];
  };

  /**
   * METHODS
   */
  const closePopup = () => {
    setCurHero("");
    setPopupFlag(false);
  };

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePopup();
    }
  });

  /**
   * Main app
   */
  return (
    <div className="App bg-neutral-800">
      <header>
        <Announcement />
        <div className="Banner" />
      </header>
      <div className="mx-auto text-white">
        <RenderHeroTypes
          setCurHero={setCurHero}
          heroesByAttributes={heroesByAttributes}
          attributes={attributes}
        />
        <HeroPopup hero={curHero} popupFlag={popupFlag} closePopup={closePopup}>
          <HeroShards allHeroes={allHeroes} hero={curHero} />
        </HeroPopup>
      </div>
    </div>
  );
}

export default App;
