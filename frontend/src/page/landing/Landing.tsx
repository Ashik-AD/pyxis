import { Link } from "react-router-dom";
import { RiLoginCircleLine } from "react-icons/ri";
import { noImage } from "../../utils/noImage";
const Landing = () => {
  return (
    <section
      className="h-screen w-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${noImage.banner})`,
      }}
    >
      <div
        className="h-full w-full flex content-center relative p-20"
        style={{
          background:
            "linear-gradient(193.85deg, rgba(155, 17, 167, 0.8) 7.42%, rgba(7, 182, 66, 0.616) 90.11%)",
        }}
      >
        <Link
          to="/login"
          className="absolute flex items-center top-10 right-20 color-light-gray text-medium font-semibold bg-secondary px-20 py-6 rounded-xlg"
        >
          <>
            Login
            <RiLoginCircleLine
              className="color-purple"
              style={{ marginLeft: 6 }}
            />
          </>
        </Link>
        <div className="flex flex-col gap-40 w-full sm:w-60">
          <div className="color-white text-lg sm:text-heading font-semibold text-center">
            Join the world of Movie & TV shows where you find all the
            information you looking.
          </div>
          <div className="text-center flex flex-col content-center">
            <Link
              to="/signup"
              className="px-50 py-14 rounded-xxlg color-white text-lg font-semibold border-2"
              style={{
                background:
                  "linear-gradient(120deg, rgba(155, 17, 167, 0.8) 7.42%, rgba(7, 182, 66, 0.616) 90.11%)",
              }}
            >
              Join Us Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
