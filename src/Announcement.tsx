import { useState } from "react";

const eventWikiLink =
  "https://dota2.fandom.com/wiki/Aghanim%27s_Labyrinth:_The_Continuum_Conundrum";

export default function Announcement() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const closeAnnouncement = showAnnouncement ? "" : "hidden";
  const visitWiki = () => {
    window.open(eventWikiLink);
  };

  return (
    <div
      className={
        "flex w-full text-gray-400 bg-neutral-900 " + closeAnnouncement
      }
    >
      <p className="flex-auto" />
      <p>
        📢 The event has ended on February 2022. There are some mods available
        in the Custom Games if you want to try it out!
        <a
          onClick={visitWiki}
          className="mx-1 text-blue-500 cursor-pointer font-description visited:text-purple-500"
        >
          Link to the event details ↗️
        </a>
      </p>
      <p className="flex-auto" />
      <p
        className="flex-none float-right mx-2 text-white cursor-pointer"
        onClick={() => setShowAnnouncement(false)}
      >
        ✖
      </p>
    </div>
  );
}
