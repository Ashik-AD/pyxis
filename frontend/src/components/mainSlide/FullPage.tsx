import React from "react";

import FullPagePropsType from "../types/fullpage";
import FullpageHeadingMobile from "../heading/FullpageHeadingMobile";
import FullPageHeading from "../heading/FullpageHeading";

const FullPage: React.FC<FullPagePropsType> = (props) => {
  const { id, detail_url, media_type } = props;
  return (
    <div className="relative flex bg-cover bg-center w-full h-screen sm:max-h-600">
      <div className="hidden sm:visible w-full">
        <FullPageHeading {...props} />
      </div>
      <div className="sm:hidden">
        <FullpageHeadingMobile
          {...props}
          detail_path={detail_url}
          id={id.toString()}
          media_type={media_type}
        />
      </div>
    </div>
  );
};

export default FullPage;
