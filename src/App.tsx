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

  const year = () => {
    let date = new Date();
    return date.getFullYear();
  };

  /**
   * Main app
   */
  return (
    <div className="flex App bg-neutral-800">
      <header>
        <Announcement />
        <div className="Banner" />
      </header>
      <div className="w-full px-2 text-sm text-center bg-orange-400 text-neutral-50 font-description">
        The marked skills have synergy with each other. Try out the combinations
        and see what wonders they make!
      </div>
      <div className="flex-auto mx-auto text-white">
        <RenderHeroTypes
          setCurHero={setCurHero}
          heroesByAttributes={heroesByAttributes}
          attributes={attributes}
        />
        <HeroPopup hero={curHero} popupFlag={popupFlag} closePopup={closePopup}>
          <HeroShards allHeroes={allHeroes} hero={curHero} />
        </HeroPopup>
      </div>
      <footer>
        <div className="flex justify-center p-5 text-neutral-200 bg-neutral-900 font-description">
          <img
            src="/data/github-mark-white.svg"
            width="24"
            height="24"
            style={{ maxHeight: 24 }}
            className="mr-2"
          />
          <a
            href="https://github.com/hhs5"
            className="duration-200 ease-linear hover:text-orange-400"
          >
            Honsing, {year()}
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
