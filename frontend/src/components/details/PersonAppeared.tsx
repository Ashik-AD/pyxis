import React from "react";
import { PersonCreditType } from "../types/Person.type";

import PersonAppearedLists from "./PersonAppearedList";

const PersonAppeared: React.FC<PropTypes> = ({ items, media_type }) => {
  return (
    <div className="grid col-2 md:col-4 lg:col-5 gap-20 px-20 py-50">
      {items.map((el: any) => (
        <PersonAppearedLists key={el.id} {...el} media_type={media_type} />
      ))}
    </div>
  );
};

interface PropTypes {
  items: PersonCreditType[];
  media_type: "tv" | "movie";
}
export default PersonAppeared;
