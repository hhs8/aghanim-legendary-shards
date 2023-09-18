const eventWikiLink =
  "https://dota2.fandom.com/wiki/Aghanim%27s_Labyrinth:_The_Continuum_Conundrum";

export default function Announcement() {
  const visitWiki = () => {
    window.open(eventWikiLink);
  };

  return (
    <div className={"flex text-sm text-gray-400 bg-neutral-900"}>
      <p className="flex-auto" />
      <p>
        📢 The event has ended on February 2022. There are some mods available
        in the Custom Games if you want to try it out!
        <a
          onClick={visitWiki}
          className="mx-1 text-blue-500 cursor-pointer font-description"
        >
          Link to the event details ↗️
        </a>
      </p>
      <p className="flex-auto" />
    </div>
  );
}
