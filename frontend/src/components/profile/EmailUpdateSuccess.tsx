import "./Doddle.css";
import Looking from "../../image/looking.png";
import { Link } from "react-router-dom";
const EmailUpdateSuccess = () => {
  return (
    <div className="fixed flex flex-col content-center h-screen w-screen top-0 left-0 bg-primary color-white">
      <h1 className="text-lg my-50 animate-fade">Email Update is finished.</h1>
      <img src={Looking} alt="success" className="animate-scaleup" />
      <Link
        to="/profile"
        className="font-semibold text-medium my-50"
        style={{ color: "#00ab72", textDecoration: "underline" }}
      >
        Back Profile
      </Link>
    </div>
  );
};

export default EmailUpdateSuccess;
