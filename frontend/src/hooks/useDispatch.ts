import { useContext } from "react";
import { StoreContext } from "../store/Store";

export default function useDispatch() {
  const ctx = useContext(StoreContext);
  return ctx.dispatch;
}

