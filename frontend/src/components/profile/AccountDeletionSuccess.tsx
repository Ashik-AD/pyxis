import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const AccountDeletionSuccess = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate("/", { replace: true }), 4000);
  }, [navigate]);
  return (
    <div className="fixed w-full h-full bg-primary top-0 left-0 flex flex-col content-center gap-50">
      <IoCheckmarkCircleOutline className="text-heading-lg color-info" />
      <div className="flex flex-col gap-10 content-center my-50">
        <span className="text-medium font-medium">Account Deletion!</span>
        <span className="text-sm font-semibold">
          Your account has been deleted successfully.
        </span>
      </div>
    </div>
  );
};

export default AccountDeletionSuccess;
