import { FC, ReactElement, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../utils/storage";
import { StoreContext } from "../store/Store";
import { ax } from "../config/default";

const Auth: FC<{ children: ReactElement }> = (props) => {
  const navigate = useNavigate();
  const {
    store: { user },
    dispatch,
  } = useContext(StoreContext);

  useEffect(() => {
    (async () => {
      const localStorage = storage.getItems();
      if (localStorage) {
        if (!user) {
          try {
            const { data } = await ax.post("get-user", {
              token: localStorage.user.token,
              uid: localStorage.user.id,
            });
            if (data) {
              dispatch({ type: "SET_USER", payload: data });
              return;
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    })();
  }, [dispatch, navigate, user]);

  return <>{props.children}</>;
};

export default Auth;
