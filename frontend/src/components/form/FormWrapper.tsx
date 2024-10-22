import { memo } from "react";

const FormWrapper = (props: any) => {
  return (
    <div className="form_container flex content-center bg-cover overflow-hidden">
      <div className="w-full h-full sm:h-auto px-20 sm:px-60 py-50 overflow-hidden sm:rounded-lg">
        {props.children}
      </div>
    </div>
  );
};

export default memo(FormWrapper);
