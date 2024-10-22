import React, { useState } from "react";
import { IoLockClosed, IoMail } from "react-icons/io5";
import FormHeader from "../../components/form/FormHeader";
import Input from "../../components/form/Input";

import { ax } from "../../config/default";
import { validateEmail, validatePassword } from "../../utils/ValidateInput";
import ShowWaitOverlay from "../../components/form/ShowWaitOverlay";
import useDispatch from "../../hooks/useDispatch";
import useUser from "../../hooks/useUser";
interface UserInputType {
  email: string;
  password: string;
}
const Login: React.FC = () => {
  const [userCredential, setUserCredential] = useState<UserInputType>({
    email: "",
    password: "",
  });
  const [credentialError, setCredentialError] = useState({
    email: "",
    password: "",
    all: "",
  });
  const [showLoading, setShowLoading] = useState(false);
  const user = useUser();
  const dispatch = useDispatch();

  const handleInputChange = (eve: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = eve.currentTarget;
    setUserCredential((prevState) => ({ ...prevState, [name]: value }));
    clearErrorMessage(name);
  };
  const handleErrorMessage = (errID: string, message: string) => {
    setCredentialError((prevState) => ({ ...prevState, [errID]: message }));
  };
  const clearErrorMessage = (errID: string) => {
    setCredentialError((prevState) => ({ ...prevState, [errID]: "", all: "" }));
  };
  const isEmpty = (id: string) =>
    userCredential[id as keyof UserInputType] ? false : true;
  const handleValidateEmail = () => {
    if (isEmpty("email")) {
      handleErrorMessage("email", "Please enter your email address.");
      return;
    }
    if (!validateEmail(userCredential.email)) {
      handleErrorMessage(
        "email",
        "Invalid email address. Please make sure you enter valid email address.",
      );
      return;
    }
    return true;
  };
  const handleValidatePassword = () => {
    if (isEmpty("password")) {
      handleErrorMessage("password", "Please enter your password");
      return;
    }

    if (!validatePassword(userCredential.password)) {
      handleErrorMessage("password", "Invalid password format");
      return;
    }
    return true;
  };

  const handleFormSubmit = async (eve: React.SyntheticEvent) => {
    eve.preventDefault();
    setShowLoading(true);
    const checkEmail = handleValidateEmail();
    if (!checkEmail) {
      return;
    }
    const checkPassword = handleValidatePassword();
    if (!checkPassword) {
      return;
    }
    const { data } = await ax.post("/login", { data: userCredential });
    if (data.status === 422 || data.status === 404) {
      setShowLoading(false);
      if (data.errCode === null) {
        handleErrorMessage("all", data.message);
        return;
      } else if (data.errCode === "email") {
        handleErrorMessage("email", data.message);
        return;
      } else if (data.errCode === "password") {
        handleErrorMessage("password", data.message);
        return;
      }
      return;
    }
    dispatch({ type: "SET_USER", payload: data.user });
    return;
  };

  if (user) {
    return null;
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      autoComplete="OFF"
      className="flex flex-col gap-30 z-2"
    >
      <FormHeader title="Welcome back" subtitle="Log in to your account" />
      <Input
        type="text"
        name="email"
        label="Email Address"
        value={userCredential.email}
        onInputChange={handleInputChange}
        handleOnBlur={handleValidateEmail}
        icon={<IoMail />}
        error={credentialError.email}
      />
      <Input
        type="password"
        name="password"
        label="Password"
        value={userCredential.password}
        onInputChange={handleInputChange}
        handleOnBlur={handleValidatePassword}
        icon={<IoLockClosed />}
        error={credentialError.password}
      />
      {credentialError.all ? (
        <p className="color-red text-sm font-semibold">{credentialError.all}</p>
      ) : (
        ""
      )}
      <button
        className={`py-10 px-50 font-medium text-medium color-black rounded-xlg border-2 border-gray-light hover-bg-fade cursor-pointer bg-white`}
      >
        Log in
      </button>
      {showLoading && <ShowWaitOverlay />}
    </form>
  );
};

export default Login;
