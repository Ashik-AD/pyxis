import { FC, ReactElement, useContext } from "react";
import { StoreContext } from "../../store/Store";

const WrapperLogout: FC<{ children: ReactElement }> = ({ children }) => {
  const { dispatch } = useContext(StoreContext);
  const handleLogout = () => dispatch({ type: "CLEAR_USER" });

  return <span onClick={handleLogout}>{children}</span>;
};

export default WrapperLogout;
