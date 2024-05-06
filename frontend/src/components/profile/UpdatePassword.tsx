import React, { useState, createRef, useContext, FC } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import PasswordChange from "../../image/password_change.png";
import NormalInput from "../form/NormalInput";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import InputErrorMsg from "../form/InputErrorMsg";
import { validatePassword } from "../../utils/ValidateInput";
import { ax } from "../../config/default";
import { StoreContext } from "../../store/Store";
import ShowAlert from "../alert/ShowAlert";
import Spinner from "../loading/Spinner";
import PasswordChangeSuccess from "./PasswordChangeSuccess";
type AuthKey = {
  current: string;
  update: string;
  confirm: string;
};
type RefType = {
  TYPE: HTMLInputElement;
  focus: () => void;
};

const UpdatePassword: FC = () => {
  const {
    store: { user },
  } = useContext(StoreContext);
  const [authKey, setAuthKey] = useState<AuthKey>({
    current: "",
    update: "",
    confirm: "",
  });
  const [error, setError] = useState({
    msg: "",
    which: "",
  });
  const navigate = useNavigate();
  const [resError, setResError] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const inputRef = {
    current: createRef<RefType>(),
    update: createRef<RefType>(),
    confirm: createRef<RefType>(),
  };
  const [togglePwdVisibility, setToggleVisibility] = useState(false);

  const getAuthKeys = (key: string) => authKey[key as keyof AuthKey];

  const addFocus = (elementName: "update" | "current" | "confirm") =>
    inputRef[`${elementName}`]?.current?.focus();
  const handleSetError = (which: string, msg: string) =>
    setError((prevState) => ({
      ...prevState,
      which,
      msg,
    }));
  const handleChangeInput = (eve: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = eve.currentTarget;
    setError({ msg: "", which: "" });
    setAuthKey((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleTogglePwdVisibility = (val?: boolean) =>
    setToggleVisibility((prevState) => (val !== undefined ? val : !prevState));
  const handleValidatePassword = (eve: any) => {
    const name: "current" | "update" | "confirm" = eve.currentTarget.name;
    if (!getAuthKeys(name)) {
      handleSetError(name, `Can't be blank :(`);
      addFocus(name);
      return;
    }

    if (getAuthKeys(name).length < 7) {
      handleSetError(name, "At least 8 characters in length");
      addFocus(name);
      return;
    }

    if (!validatePassword(getAuthKeys(name))) {
      handleSetError(
        name,
        "Contains at least one of the following types (a-z), (A-Z), (0-9), (!,@,#,$)."
      );
      addFocus(name);
      return;
    }
  };

  const handleSubmit = async (eve: React.SyntheticEvent) => {
    eve.preventDefault();

    if (error.which || error.msg) {
      return;
    }
    if (!authKey.confirm || !authKey.current || !authKey.update) {
      const which = !authKey.current
        ? "current"
        : !authKey.update
        ? "update"
        : "confirm";
      handleSetError(which, `Can't be blank.`);
      addFocus(which);
      return;
    }

    if (authKey.update !== authKey.confirm) {
      handleSetError("confirm", `Please confirm your password`);
      addFocus("confirm");
      return;
    }
    setShowStatus(true);
    try {
      const { data, status } = await ax.post(`/security/update-auth/password`, {
        data: {
          uid: user?.id,
          currentPwd: authKey.current,
          newPwd: authKey.update,
        },
      });
      if (status === 200) {
        const { msg, code } = data;
        if (code === "INCORRECT_PWD") {
          handleSetError("current", msg);
          addFocus("current");
          return;
        }
        if (code === "INVALID_PASSWORD_FORMAT") {
          handleSetError("current", msg);
          addFocus("current");
          return;
        }

        if (code === "USER_NOEXIST") {
          setResError(msg);
          return;
        }
        return;
      }
      setAuthKey({ current: "", update: "", confirm: "" });
      setError({ msg: "", which: "" });
      setResError("");
      setShowStatus(false);
      return navigate("password-change/success", { replace: true });
    } catch (error) {
      setResError("Something went wrong");
      return;
    } finally {
      setShowStatus(false);
    }
  };

  return (
    <div className="py-50 flex flex-col">
      <div className="flex content-center">
        <img
          src={PasswordChange}
          alt="password-change-banner"
          className="w-200"
        />
      </div>
      <div className="flex flex-col gap-20 content-center ">
        <span className="color-white text-medium font-medium my-20">
          Change Your password
        </span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-20 w-full content-center sm:w-400"
        >
          <div className="flex flex-col content-center">
            <div className="relative flex bg-fade rounded-xlg font-bold overflow-hidden">
              <span
                className={`color-white flex px-16 py-6 z-1 rounded-xlg hover-bg-fade rounded-xlg`}
                onClick={() => handleTogglePwdVisibility(false)}
              >
                <VscEyeClosed />
              </span>
              <span
                className={`color-white flex px-16 py-6 cursor-pointer hover-bg-fade overflow-hidden  rounded-xlg z-1`}
                onClick={() => handleTogglePwdVisibility(true)}
              >
                <VscEye />
              </span>
              <span
                className={`w-50 bg-purple h-full absolute rounded-xlg z-0`}
                style={{
                  transform: `translateX(${
                    togglePwdVisibility ? "100%" : "0"
                  })`,
                  transition: "all .3s linear",
                }}
              ></span>
            </div>
          </div>
          <div className="flex flex-col content-center gap-10 w-full">
            {error.which === "current" && (
              <InputErrorMsg
                error={error.msg}
                styles="text-right text-sm w-full"
              />
            )}
            <NormalInput
              name="current"
              value={authKey.current}
              type={togglePwdVisibility ? "text" : "password"}
              handleOnChange={handleChangeInput}
              placeholder="Current password"
              error={error.which === "current" && true}
              handleFocusOut={handleValidatePassword}
              ref={inputRef.current}
              styles="w-full"
            />
          </div>
          <div className="flex flex-col gap-10 w-full content-center">
            <NormalInput
              name="update"
              value={authKey.update}
              type={togglePwdVisibility ? "text" : "password"}
              handleOnChange={handleChangeInput}
              handleFocusOut={handleValidatePassword}
              placeholder="New password"
              styles="w-full"
              error={error.which === "update" && true}
              ref={inputRef.update}
            />
            {error.which === "update" && (
              <InputErrorMsg error={error.msg} styles="text-right text-sm" />
            )}
          </div>
          <div className="flex flex-col content-center gap-10 w-full">
            <NormalInput
              name="confirm"
              value={authKey.confirm}
              type={togglePwdVisibility ? "text" : "password"}
              handleOnChange={handleChangeInput}
              handleFocusOut={handleValidatePassword}
              placeholder="Confirm password"
              styles="w-full"
              error={error.which === "confirm" && true}
              ref={inputRef.confirm}
            />
            {error.which === "confirm" && (
              <InputErrorMsg error={error.msg} styles="text-right text-sm" />
            )}
          </div>
          <div className="flex content-center sm:content-normal">
            <button
              className="border-2 border-gray bg-purple rounded-xlg color-white font-semibold my-10"
              disabled={error.which ? true : false}
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
      <ShowAlert
        success=""
        error={resError}
        clearAlert={() => setResError("")}
      />
      {showStatus && (
        <div
          className="fixed flex flex-col content-center h-screen w-screen top-0 left-0 z-2 color-white px-20"
          style={{ background: "#13000fde" }}
        >
          <div className="flex flex-col bg-primary w-full px-20 py-50 rounded-lg content-center">
            <span className="text-lg font-semibold">Please Wait...</span>
            <span className="text-sm font-semibold my-10">
              We're changing your password.
            </span>
            <Spinner styles="text-heading my-20" />
          </div>
        </div>
      )}
      <Routes>
        <Route
          path="/password-change/success"
          element={<PasswordChangeSuccess />}
        />
      </Routes>
    </div>
  );
};

export default UpdatePassword;
