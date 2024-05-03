import { FC, ReactElement } from "react";
import isConnectionAvailable from "../../utils/isConnAvailable";
import Alert from "../alert/Alert";
import AlertText from "../alert/AlertText";
const Connection: FC<{ children: ReactElement }> = (props) => {
  if (!isConnectionAvailable()) {
    return (
      <>
        <Alert>
          <AlertText text="No internet available :(!" type="info" />
        </Alert>
      </>
    );
  }
  return <>{props.children}</>;
};

export default Connection;
