import { memo } from "react";
import { noImage } from "../../utils/noImage";

const FormWrapper = (props: any) => {
  return (
    <div
      className="form_container flex h-screen content-center w-screen bg-cover z-2 overflow-hidden"
      style={{
        background: `linear-gradient(157.41deg, rgba(14, 156, 2, 0.75) 14.4%, rgba(173, 11, 187, 0.6375) 89.92%),url(${noImage.banner})`,
      }}
    >
      <div className="w-full h-full sm:h-auto md:w-75 lg:w-40 px-20 sm:px-50 py-50 bg-secondary overflow-hidden sm:rounded-lg">
        {props.children}
      </div>
    </div>
  );
};

export default memo(FormWrapper);
