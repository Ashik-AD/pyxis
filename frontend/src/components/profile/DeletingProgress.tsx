import "./Progressbar.css";
const DeletingProgress = () => {
  return (
    <div
      className="absolute flex content-center flex-col top-0 left-0 w-full h-full gap-10 glass"
      style={{ background: "#024245db" }}
    >
      <span className="text-medium font-medium">Please wait a moment.</span>
      <div className="progress-outer w-50 my-20">
        <div className="progress-inner"></div>
      </div>
    </div>
  );
};

export default DeletingProgress;
