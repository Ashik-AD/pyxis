import { useContext } from "react";
import { StoreContext } from "../store/Store";

export default function useStore() {
  const ctx = useContext(StoreContext);

  return ctx.store;
}
