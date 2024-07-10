import RenderHeroes from "./RenderHeroes";

interface GuidePopupProps {
  guideFlag: boolean;
  closeGuide: Function;
}

export default function HeroPopup(props: Readonly<GuidePopupProps>) {
  const popupControl = () => {
    let className = "hidden";
    if (props.guideFlag) {
      className = "absolute top-0 left-0 flex w-screen";
    }
    return className;
  };

  const closeGuide = () => {
    props.closeGuide();
  };

  return (
    <div className={popupControl()}>
      <div className="flex-auto"></div>
      <div className="relative z-10 float-right p-2 m-4 border-2 border-neutral-400 bg-neutral-900">
        <div className="mb-2 text-left">
          <div className="flex ">
            <div className="flex-auto"></div>
            <div className="flex-none leading-relaxed">💡 Usage Guide</div>
            <div className="flex-auto"></div>
            <div className="flex text-base cursor-pointer" onClick={closeGuide}>
              ✖
            </div>
          </div>
        </div>
        <div className="text-left">
          <p>
            1. Press <b>ESC</b> or outside the popup to close.
          </p>
          <p>2. Press left or right arrow key to cycle through the heroes.</p>
        </div>
      </div>

      <div className="flex-auto"></div>
    </div>
  );
}
