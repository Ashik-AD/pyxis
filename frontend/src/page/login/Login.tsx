import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoLockClosed, IoMail } from "react-icons/io5";
import FormFooter from "../../components/form/FormFooter";
import FormHeader from "../../components/form/FormHeader";
import FormWrapper from "../../components/form/FormWrapper";
import Input from "../../components/form/Input";
import InputGroup from "../../components/form/InputGroup";

import { ax } from "../../config/default";
import { validateEmail, validatePassword } from "../../utils/ValidateInput";
import { StoreContext } from "../../store/Store";
import ShowWaitOverlay from "../../components/form/ShowWaitOverlay";
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

  const { store, dispatch } = useContext(StoreContext);

  const navigate = useNavigate();
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
        "Invalid email address. Please make sure you enter valid email address."
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
    navigate("/");
    return;
  };

  if (store.user) {
    navigate("/");
  }
  return (
    <FormWrapper>
      <form
        onSubmit={handleFormSubmit}
        autoComplete="OFF"
        className="flex flex-col content-center px-20 lg:px-50 z-2"
      >
        <FormHeader title="Log in" />
        <InputGroup classes="w-full">
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
        </InputGroup>
        {credentialError.all ? (
          <p className="color-red text-sm font-semibold">
            {credentialError.all}
          </p>
        ) : (
          ""
        )}
        <button className="px-50 py-8 my-20 mb-50 color-success text-medium font-semibold rounded-lg">
          Log in
        </button>
        <FormFooter path="/signup" accountStatus="dont" />
        {showLoading && <ShowWaitOverlay />}
      </form>
    </FormWrapper>
  );
};

export default Login;
