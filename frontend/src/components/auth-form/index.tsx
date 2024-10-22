import { CSSProperties, useState } from "react";
import useUser from "../../hooks/useUser";
import FormWrapper from "../form/FormWrapper";
import Container from "../layout/container";
import Login from "./Login";
import SignUp from "./SignUp";

export type AuthFormType = "signup" | "login";

type Props = {
  defaultForm?: AuthFormType;
};

export function AuthForm({ defaultForm }: Props) {
  const user = useUser();
  let [formType, setFormType] = useState<AuthFormType>(() => defaultForm || "signup");
  const activeBg = "#ffffff";
  const inactiveBg = "#ffffff70";

  if (user) {
    return null;
  }

  return (
    <Container
      className="w-full bg-black py-50 rounded-xlg"
      style={{ maxWidth: 624, width: "100%" }}
    >
      <div
        className="flex items-center"
        style={{ borderRadius: 12, overflow: "hidden" }}
      >
        <button
          style={{
            ...styles,
            background: formType == "signup" ? activeBg : inactiveBg,
          }}
          onClick={() => setFormType("signup")}
        >
          Sign up
        </button>
        <button
          style={{
            ...styles,
            background: formType == "login" ? activeBg : inactiveBg,
          }}
          onClick={() => setFormType("login")}
        >
          Log in
        </button>
      </div>
      <FormWrapper>{formType == "signup" ? <SignUp /> : <Login />}</FormWrapper>
    </Container>
  );
}
const styles: CSSProperties = {
  flex: 1,
  height: "56px",
  background: "#fff",
  color: "#111111",
  textAlign: "center",
  fontSize: 18,
  border: 0,
};
