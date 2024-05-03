import { useEffect } from "react";
import PlangentImage from "../../image/planets.png";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
const PasswordChangeSuccess = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      return navigate("/profile", { replace: true });
    }, 3000);
  }, [navigate]);
  return (
    <div className="fixed flex flex-col gap-20 w-screen h-screen top-0 left-0 content-center bg-primary z-2">
      <IoMdCheckmarkCircleOutline className="color-info text-heading-lg" />
      <div className="flex flex-col text-center font-semibold color-white my-20 gap-10">
        <span className="text-lg">Password Change!</span>
        <span className="text-sm color-gray">
          Your password has been change successfully
        </span>
      </div>
      <img src={PlangentImage} alt="banner_success" className="w-75" />
      <Link
        to="/profile"
        className="color-purple font-semibold"
        style={{ textDecoration: "underline" }}
      >
        Back 2 Profile
      </Link>
    </div>
  );
};

export default PasswordChangeSuccess;
