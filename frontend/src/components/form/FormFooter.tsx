import React from "react";
import { Link } from "react-router-dom";
const FormFooter: React.FC<{ path: string; accountStatus: "dont" | "do" }> = (
  props
) => {
  return (
    <div className="text-center color-white">
      {props.accountStatus === "do" ? "Have " : "Dont have "} an account.
      <br /> Please{" "}
      <Link to={props.path} className="color-info font-bold">
        {props.accountStatus === "do" ? "Login" : "Create account "}.
      </Link>
    </div>
  );
};

export default React.memo(FormFooter);
