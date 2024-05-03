import { FC } from "react";
import Modal from "../modal/Modal";

const ConfirmationBox: FC<PropsType> = ({ handleClick, handleCloseBox }) => {
  return (
    <Modal handleClick={handleCloseBox}>
      <div>
        <div className="w-full flex flex-col sm:w-300 bg-primary rounded-lg py-20 px-50 color-white space-y-20">
          <p className="text-center text-lg font-medium my-20">
            Are your sure?
          </p>
          <div className="flex content-center gap-20">
            <button
              className="rounded-xlg bg-purple color-white font-semibold border-white"
              onClick={handleCloseBox}
            >
              Back
            </button>
            <button
              className="rounded-xlg bg-fade color-white font-semibold hover-bg-fade"
              onClick={handleClick}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
interface PropsType {
  handleClick: (arg?: any) => void;
  handleCloseBox: (arg?: any) => void;
}
export default ConfirmationBox;
