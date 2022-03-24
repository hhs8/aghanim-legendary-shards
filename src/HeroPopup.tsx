import { ReactElement } from "react";

interface HeroPopupProps {
  popupFlag: boolean;
  children: ReactElement;
  closePopup: Function;
}

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

  return (
    <div className={popupControl()}>
      <div
        className="absolute z-10 aghanim-popup-overlay"
        onClick={closePopup}
      />
      <div className="absolute z-20 w-screen h-screen p-8">
        <div className="z-20 inline-block text-left bg-gray-700 rounded-lg aghanim-popup-content">
          <div className="p-6 pb-0 text-left shard-contents">
            {props.children}
          </div>
          <div
            className="py-3 text-center underline align-middle cursor-pointer"
            onClick={closePopup}
          >
            CLOSE
          </div>
        </div>
      </div>
    </div>
  );
}
