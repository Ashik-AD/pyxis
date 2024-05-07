import useDispatch from "./useDispatch";

export default function useAuth() {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: "CLEAR_USER" });
  };
  return { logout } as const;
}
