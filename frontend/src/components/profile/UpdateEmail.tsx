import React, { useContext, useState, createRef, useEffect } from "react";
import { StoreContext } from "../../store/Store";
import { validateEmail } from "../../utils/ValidateInput";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import Modal from "../modal/Modal";
import { ax } from "../../config/default";
import Loading from "./Loading";
import Spinner from "../loading/Spinner";
import EmailUpdateSuccess from "./EmailUpdateSuccess";
import { useNavigate, Route, Routes } from "react-router-dom";
import NormalInput from "../form/NormalInput";
const UpdateEmail = () => {
  const {
    store: { user },
    dispatch,
  } = useContext(StoreContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [authKey, setAuthKey] = useState("");
  const [error, setError] = useState({
    authError: "",
    emailError: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const updatedEmailRef = createRef<HTMLInputElement>();
  const pwdRef = createRef<HTMLInputElement>();
  useEffect(() => {
    updatedEmailRef && updatedEmailRef.current!.focus();
  }, [updatedEmailRef]);
  useEffect(() => {
    return () => {
      setError({ authError: "", emailError: "" });
      setAuthKey("");
      setShowModal(false);
    };
  }, []);
  const handleInputChange = (eve: React.FormEvent<HTMLInputElement>) => {
    if (error.emailError) {
      clearErrorMessage();
    }
    setEmail(eve.currentTarget.value);
  };

  const handleEmailAuth = () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      setError((prevState) => ({
        ...prevState,
        emailError:
          "Invalid email address. Please provide valid email address.",
      }));
      return;
    }
    setShowModal(true);
  };
  const handleSetAuthKey = (eve: React.FormEvent<HTMLInputElement>) => {
    setAuthKey(eve.currentTarget.value);
  };
  const clearErrorMessage = () => {
    setError({ authError: "", emailError: "" });
  };
  const handleToggleVisiblePassword = () =>
    setShowPassword((prevState) => !prevState);
  const handleCloseModal = () => {
    setAuthKey("");
    setError((prevState) => ({
      ...prevState,
      authError: "",
    }));
    setShowModal(false);
  };

  const handleUpdateTransaction = async () => {
    setIsLoading(true);
    try {
      const { data, status } = await ax.post("/account/update-email", {
        data: {
          uid: user?.id,
          newEmail: email,
          password: authKey,
        },
      });
      if (status === 200) {
        if (data.err.code === "INVALID_PASSWORD") {
          setError((prevState) => ({ ...prevState, authError: data.err.msg }));
          return;
        }
        if (data.err.code === "EMAIL_IN_USED") {
          setError((prevState) => ({ ...prevState, emailError: data.err.msg }));
          handleCloseModal();
          return;
        }
        setError((prevState) => ({ ...prevState, authError: data.err.msg }));
        pwdRef.current?.focus();
        return;
      }
      setAuthKey("");
      clearErrorMessage();
      setShowModal(false);
      const updatedUser = { ...user };
      updatedUser.email = email;
      dispatch({ type: "SET_USER", payload: updatedUser });
      setEmail("");
      return navigate("update-success", { replace: true });
    } catch (err: any) {
      setError(err.msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen content-center sm:content-left w-full">
      <h1 className="color-white text-lg sm:text-heading text-center w-full">
        Change your email
      </h1>
      <section
        className="flex flex-col items-center gap-20 space-y-10 w-full sm:text-right"
        style={{ marginTop: 50 }}
      >
        <div className="flex flex-col sm:items-center sm:flex-row gap-10 color-light-gray w-full">
          <span className="font-semibold px-10 sm:w-25">
            <p>Current Email</p>
          </span>
          <NormalInput
            type="text"
            name="current_email"
            styles="w-full sm:w-75"
            value={user?.email}
          />
        </div>
        <div className="flex flex-col sm:items-center sm:flex-row gap-10 color-light-gray w-full">
          <span className="font-semibold px-10 sm:w-25">New Email</span>
          <NormalInput
            type="text"
            name="current_email"
            value={email}
            handleOnChange={handleInputChange}
            handleOnClick={clearErrorMessage}
            ref={updatedEmailRef}
            styles="w-full sm:w-75"
          />
        </div>
        {error.emailError && (
          <span className="color-red font-semibold">{error.emailError}</span>
        )}
        <div className="flex content-center">
          <button
            className={`border-2 border-gray  color-white font-semibold rounded-xlg py-10 px-20 ${
              email && !error.emailError
                ? "bg-purple hover-shadow "
                : "bg-fade color-light-gray cursor-default"
            }`}
            onClick={handleEmailAuth}
            disabled={!email || error.emailError ? true : false}
          >
            Update Email
          </button>
        </div>
      </section>
      {showModal && email && (
        <Modal handleClick={handleCloseModal}>
          <div className="bg-primary px-20 py-10 color-white flex flex-col gap-20 rounded-lg sm:w-400 relative">
            <span className="text-medium font-semibold my-20">
              Provide Password
            </span>
            <div className="relative">
              <NormalInput
                type={showPassword ? "text" : "password"}
                name="pwd"
                value={authKey}
                handleOnChange={handleSetAuthKey}
                handleOnClick={() =>
                  setError((prevState) => ({ ...prevState, authError: "" }))
                }
                styling={{ paddingRight: 30 }}
                styles="w-full"
                ref={updatedEmailRef}
              />
              <span className="absolute right-10" style={{ top: 14 }}>
                {showPassword ? (
                  <VscEye onClick={handleToggleVisiblePassword} />
                ) : (
                  <VscEyeClosed onClick={handleToggleVisiblePassword} />
                )}
              </span>
            </div>
            {error.authError && (
              <span className="color-red font-semibold">{error.authError}</span>
            )}
            <div className="flex gap-10 space-between py-10">
              <button
                onClick={handleCloseModal}
                className="border-2 bg-secondary color-light-gray border-fade rounded-xlg hover-bg-fade"
              >
                Back
              </button>
              <button
                onClick={handleUpdateTransaction}
                className="border-1 border-purple bg-purple color-white font-semibold rounded-xlg"
                disabled={authKey.length < 7 ? true : false}
                style={authKey.length < 7 ? { cursor: "not-allowed" } : {}}
              >
                Processed
              </button>
            </div>
            {isLoading && (
              <Loading title="Updating your email :)">
                <Spinner styles="h-100 text-heading" />
              </Loading>
            )}
          </div>
        </Modal>
      )}
      <Routes>
        <Route path="/update-success" element={<EmailUpdateSuccess />} />
      </Routes>
    </div>
  );
};

export default UpdateEmail;
