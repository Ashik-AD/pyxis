import React, { FC, ReactElement, useState } from "react";
import ShowAlert from "../components/alert/ShowAlert";

export const AlertContext = React.createContext<{
  setAlert: (text: string, type: "error" | "success") => void;
}>({ setAlert(text, type) {} });
const AlertShow: FC<{ children: ReactElement }> = (props) => {
  const [alert, setAlert] = useState({
    type: "",
    text: "",
  });
  const handleSetAlert = (text: string, type: "error" | "success") => {
    setAlert({ text, type });
  };
  return (
    <AlertContext.Provider value={{ setAlert: handleSetAlert }}>
      {props.children}
      <ShowAlert
        error={alert.type === "error" ? alert.text : ""}
        success={alert.type === "success" ? alert.text : ""}
        clearAlert={() => setAlert({ type: "", text: "" })}
      />
    </AlertContext.Provider>
  );
};

export default AlertShow;
