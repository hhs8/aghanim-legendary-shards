import { useState, useEffect } from "react";
import Announcement from "./components/Announcement";
import RenderHeroTypes from "./components/RenderHeroTypes";
import HeroPopup from "./components/HeroPopup";
import HeroShards from "./components/HeroShards";
import legendaryJSON from "./data/legendary.json";
import githubSvg from "./data/github-mark-white.svg";
import "./App.css";

const legendary: { [key: string]: any } = legendaryJSON;

function App() {
  const [curHero, setCurHero] = useState("");
  const [popupFlag, setPopupFlag] = useState(false);

  /**
   * HOOKS
   */
  useEffect(() => {
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
  const heroList: string[] = [];
  heroesByAttributes.forEach(heroes => {
    heroList.push(...heroes);
  }); 

  /**
   * METHODS
   */
  const closePopup = () => {
    setCurHero("");
    setPopupFlag(false);
  };

  enum Direction {Left, Right};

  const cycleByArrowKey = (order: Direction) => {
    if (curHero === "") {
      return;
    }
    let index = heroList.indexOf(curHero);
    let movement = ( order === Direction.Left )
      ? -1
      : 1;
    index += movement;
    if (index < 0) {
      index = heroList.length - 1;
    }
    else if (index == heroList.length) {
      index = 0;
    }
    setCurHero(heroList[index]);
  }

  const handleKeyEvent = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closePopup();
    }
    if (e.key === "ArrowLeft") {
      cycleByArrowKey(Direction.Left);
    }
    if (e.key === "ArrowRight") {
      cycleByArrowKey(Direction.Right);
    }
  };
  
  useEffect(() => {
    window.addEventListener("keydown", handleKeyEvent);
    return () => window.removeEventListener("keydown", handleKeyEvent);
  });

  // window.addEventListener("keydown", handleKeyEvent);

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
            src={githubSvg}
            width="24"
            height="24"
            style={{ maxHeight: 24 }}
            className="mr-2"
          />
          <a
            href="https://github.com/hhs8/aghanim-legendary-shards"
            className="duration-200 ease-linear hover:text-orange-400"
          >
            Honsing, 2022-{year()}
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
