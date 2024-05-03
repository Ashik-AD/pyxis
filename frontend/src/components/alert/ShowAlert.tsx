import { FC } from "react";
import Alert from "./Alert";
import AlertText from "./AlertText";
const ShowAlert: FC<PropsType> = ({ success, error, clearAlert }) => {
  return (
    <>
      {(error || success) && (
        <Alert handleAlert={clearAlert}>
          <AlertText text={success || error} type={success ? "info" : "warn"} />
        </Alert>
      )}
    </>
  );
};

interface PropsType {
  error: string;
  success: string;
  clearAlert: () => void;
}

export default ShowAlert;
