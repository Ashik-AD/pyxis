import React from "react";
import { useNavigate, Routes, Route, useParams } from "react-router-dom";
import SeasonSideBar from "../../components/details/SeasonSideBar";
import { RiArrowLeftLine } from "react-icons/ri";
import EpisodeLists from "../../components/details/EpisodeLists";

const Seasons: React.FC<PropTypes> = ({ seasonLists, tv_name, tv_id }) => {
  const params: any = useParams();
  const nav = useNavigate();
  return (
    <section
      className="fixed w-screen h-screen bg-secondary z-2 top-0 left-0"
      style={{ paddingTop: 50 }}
    >
      <div className="container flex overflow-hidden">
        <div className="side_bar w-25 bg-primary h-screen hidden lg:visible">
          <div className="flex items-center text-medium py-20 px-10 gap-10">
            <RiArrowLeftLine
              className="cursor-pointer text-lg"
              title="Back"
              onClick={() => nav("../")}
            />
            <span className="truncate">{tv_name}</span>
          </div>
          <SeasonSideBar seasons={seasonLists} />
        </div>
        <div className="episodes_lists flex sm:p-30 overflow-y-scroll w-full lg:w-75 h-screen">
          <Routes>
            <Route
              path="/*"
              element={<EpisodeLists tv_id={tv_id} season_number={params.id} />}
            />
          </Routes>
        </div>
      </div>
    </section>
  );
};

interface PropTypes {
  seasonLists: any[];
  tv_name: string;
  tv_id: string | number;
}

export default Seasons;
