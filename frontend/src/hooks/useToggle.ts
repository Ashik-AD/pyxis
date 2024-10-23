// use this hooks for toggling state
import { useState } from "react";

export default function useToggle(t = false) {
  let [toggle, setToggle] = useState(t);

  function handleToggle() {
    return setToggle((prev) => !prev);
  }
  return { toggle, handleToggle } as const;
}
