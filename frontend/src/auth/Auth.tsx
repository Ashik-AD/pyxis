import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

export default function Auth({ children }: { children: ReactNode }) {
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return <>{children}</>;
}
