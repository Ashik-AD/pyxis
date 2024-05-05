import { useContext } from "react";
import { StoreContext } from "../store/Store";

export default function useUser()  {
  let storeCtx = useContext(StoreContext);
  let { user } = storeCtx.store;
  return user;
}
