import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

const SeasonSideBar: React.FC<PropTypes> = ({ seasons }) => {
  const [pose, setPose] = useState(0);
  const [containerHeight, setContainerHeight] = useState(100);
  const params = useParams();
  const circleRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<any>(null);
  const containerRef = useRef<any>(null);
  const curSeasonId = returnId(params.id?.split("/").pop());
  useEffect(() => {
    const getActivePose = () => {
      if (!activeRef.current) return 0;
      const { offsetTop, clientHeight } = activeRef.current;
      return offsetTop - clientHeight;
    };
    const container = () => {
      const { clientHeight, scrollHeight } = containerRef.current;
      return { clientHeight, scrollHeight };
    };
    const activeElementPos = getActivePose();
    const scrollHeight = container().scrollHeight;
    if (activeElementPos > container().clientHeight) {
      containerRef.current.scrollTop = scrollHeight / 2;
    }
    setContainerHeight(scrollHeight);
    setPose(activeElementPos);
  }, []);
  const lc = useLocation();
  const handleClick = (eve: any) => {
    const { offsetTop, clientHeight } = eve.currentTarget;
    setPose(offsetTop - clientHeight);
  };

  return (
    <div
      className="flex overflow-hidden  overflow-y-scroll scrollbar-on-hover"
      style={{ height: "80%", paddingLeft: 50 }}
      ref={containerRef}
    >
      <div className="relative h-full flex">
        <div
          className="h-full bg-fade rounded-lg"
          style={{ width: 8, height: containerHeight }}
        ></div>
        <div
          ref={circleRef}
          className="circle bg-white absolute rounded-full transition-1"
          style={{
            width: 30,
            height: 30,
            border: "8px solid purple",
            right: -10,
            top: pose,
          }}
        ></div>
      </div>
      <div className="flex flex-col w-full">
        {seasons.map((el, index) => (
          <Link
            to={lc.pathname.replace(
              `season/${curSeasonId.toString()}`,
              `season/${el.season_number}`
            )}
            onClick={handleClick}
            ref={curSeasonId === el.season_number ? activeRef : null}
            key={el.id}
            className={`flex flex-col p-20 px-50 cursor-pointer hover-bg-fade color-white ${
              curSeasonId === el.season_number
                ? "bg-secondary color-purple"
                : ""
            }`}
            data-active={curSeasonId === el.id}
          >
            <span className="text-medium font-medium">{el.name}</span>
            <span className="text-sm font-semibold">
              {el.episode_count} episode
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
interface PropTypes {
  seasons: Array<Seasons>;
}
type Seasons = {
  id: number;
  name: string;
  episode_count: number;
  season_number: number;
};

const returnId = (id: string | undefined) => (id ? +id : false);
export default SeasonSideBar;
