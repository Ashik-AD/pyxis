import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/form/Input";
import { ax } from "../../config/default";

import { IoLockClosed, IoMail, IoPerson } from "react-icons/io5";

import { SignupTypes } from "./signupType";
import {
  checkPattern,
  validateEmail,
  validatePassword,
} from "../../utils/ValidateInput";
import ShowWaitOverlay from "../../components/form/ShowWaitOverlay";
import FormHeader from "../form/FormHeader";
import Loading from "./components/Loading";

const SignUp: React.FC = () => {
  const [userInputs, setUserInputs] = useState<SignupTypes>({
    fullName: "",
    email: "",
    password: "",
    conPassword: "",
  });
  const [inputError, setInputError] = useState({
    fullName: null,
    email: null,
    password: null,
    conPassword: null,
  });
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const navigate = useNavigate();
  const slideRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (eve: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = eve.currentTarget;
    setUserInputs((prevState) => ({ ...prevState, [name]: value }));
    clearInputError(name);
  };
  const clearInputError = (eID: string): void => {
    if (eID) {
      setInputError((prevState) => ({ ...prevState, [eID]: null }));
    }
  };
  const validateUserName = () => {
    const { fullName } = userInputs;
    const name = "fullName";
    if (!fullName) {
      handleError(name, "Please enter your full name");
      return;
    }
    if (fullName.length < 3) {
      handleError(name, "Name is too short");
      return;
    }
    if (!checkPattern(fullName)) {
      handleError(
        name,
        "Invalid name. Please enter alphabet, digit, space, underscore.",
      );
      return;
    }
    return true;
  };
  const handleEmailValidation = () => {
    const name = "email";
    const { email } = userInputs;
    if (!email) {
      handleError(name, "Please enter your email address.");
      return;
    }

    if (!validateEmail(email)) {
      handleError(
        name,
        "Invalid email address. Please make sure you provide correct email address.",
      );
      return;
    }
    return true;
  };

  const handlePasswordValidation = () => {
    const { password } = userInputs;
    const name = "password";
    if (!password) {
      handleError(name, "Please enter password");
      return;
    }

    if (!validatePassword(password)) {
      handleError(
        name,
        "Invalid password formate. You can use alphabets, digits, special symbols.",
      );
      return;
    }
    return true;
  };

  const handleConfirmPwdValidation = () => {
    const name = "conPassword";
    const { conPassword, password } = userInputs;
    if (!conPassword) {
      handleError(name, "Please enter your confirm password.");
      return;
    }
    if (password !== conPassword) {
      handleError(name, "Wrong confirmation password.");
      return;
    }
    return true;
  };

  const handleError = (errID: string, msg: string): void => {
    if (errID && msg) {
      setInputError((prevState) => ({ ...prevState, [errID]: msg }));
    }
  };

  const handleSubmitForm = async () => {
    const userName = validateUserName();
    if (!userName) {
      return;
    }
    const email = handleEmailValidation();
    if (!email) {
      return;
    }

    const pwd = handlePasswordValidation();
    if (!pwd) {
      return;
    }
    const conPwd = handleConfirmPwdValidation();
    if (!conPwd) {
      return;
    }
    const { data } = await ax.post("/signup", {
      data: {
        fullName: userInputs.fullName,
        email: userInputs.email,
        password: userInputs.password,
      },
    });
    if (data.status === 422) {
      setSignupSuccess(false);
      navigate("/signup", { replace: true });
      if (data.errorCode === "EMAIL_ALREADY_IN_USE") {
        handleError(
          "email",
          "Email is already in use. Please try with another email.",
        );
        slideRef.current!.style.transform = "translateX(0%)";
        setShowLoading(false);
        return;
      }
      return;
    }
    setSignupSuccess(true);
    setShowLoading(false);
  };

  if (signupSuccess) {
    return <Loading success />;
  }

  return (
    <form className="flex flex-col gap-30 w-full z-2">
      <FormHeader
        title="Sign up"
        subtitle="Discover the Movie, TV shows, artist and more."
      />
      <Input
        name="fullName"
        type="text"
        label="Full Name"
        value={userInputs.fullName}
        onInputChange={handleInputChange}
        handleOnBlur={validateUserName}
        error={inputError.fullName}
        icon={<IoPerson />}
      />
      <Input
        name="email"
        type="text"
        label="Email Address"
        value={userInputs.email}
        onInputChange={handleInputChange}
        handleOnBlur={handleEmailValidation}
        error={inputError.email}
        icon={<IoMail />}
      />
      <Input
        name="password"
        type="password"
        label="Password"
        value={userInputs.password}
        onInputChange={handleInputChange}
        handleOnBlur={handlePasswordValidation}
        error={inputError.password}
        icon={<IoLockClosed />}
      />
      <Input
        name="conPassword"
        type="password"
        label="Confirm Password"
        value={userInputs.conPassword}
        onInputChange={handleInputChange}
        handleOnBlur={handleConfirmPwdValidation}
        error={inputError.conPassword}
        icon={<IoLockClosed />}
      />
      <input
        type="button"
        value={"Create an account"}
        className={`py-10 px-50 font-medium text-medium color-black rounded-xlg border-2 border-gray-light hover-bg-fade cursor-pointer bg-white`}
        onClick={handleSubmitForm}
      />
      {showLoading && <ShowWaitOverlay />}
    </form>
  );
};

export default SignUp;
