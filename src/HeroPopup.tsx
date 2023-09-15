import { ReactElement } from "react";
import RenderHeroes from "./RenderHeroes";

interface HeroPopupProps {
  hero: string;
  popupFlag: boolean;
  children: ReactElement;
  closePopup: Function;
}

const emptyFunction = () => {
  return;
};

export default function HeroPopup(props: HeroPopupProps) {
  const popupControl = () => {
    let className = "aghanim-popup";
    if (props.popupFlag) {
      className += " aghanim-popup-show";
    }
    return className;
  };

  const closePopup = () => {
    props.closePopup();
  };

  const closePopupOutside = (e: any) => {
    if (e.target.className.includes("close-on-click")) {
      props.closePopup();
    }
  };

  return (
    <div className={popupControl()}>
      <div className="absolute z-10 aghanim-popup-overlay" />
      <div
        className="absolute z-20 w-screen h-screen p-8 close-on-click"
        onClick={closePopupOutside}
      >
        <div className="z-20 inline-block text-left bg-neutral-800 aghanim-popup-content">
          <div className="flex text-center cursor-pointer">
            <div className="flex-auto"></div>
            <div className="flex">
              <RenderHeroes
                setCurHero={emptyFunction}
                heroes={[props.hero]}
                className="m-2 pointer-events-none shard-hero-avatar"
              />
              <div className="my-4 text-2xl font-description">{props.hero}</div>
            </div>
            <div className="flex-auto"></div>

            <div className="flex-none m-3 ml-0 text-2xl" onClick={closePopup}>
              ×
            </div>
          </div>
          <div className="px-6 text-left shard-contents">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
