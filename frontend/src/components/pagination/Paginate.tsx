import React from "react";
import { Link } from "react-router-dom";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
const Paginate: React.FC<PropTypes> = ({ total_pages, active_page }) => {
  const pageRange = {
    start: active_page,
    max: 3,
  };
  return (
    <div className="flex gap-20 content-center my-20">
      <div className="page_btn_wrapper flex gap-10 items-center color-gray">
        {active_page !== 1 && (
          <PaginationButton
            pgNo={active_page - 1}
            label={<HiArrowNarrowLeft />}
          />
        )}
        {pageRange.start < 3 ? (
          Array(3)
            .fill(0)
            .map((__, index) => (
              <PaginationButton
                key={index + 1}
                pgNo={`${index + 1}`}
                isActive={active_page === index + 1}
                label={index + 1}
              />
            ))
        ) : (
          <>
            <PaginationButton
              pgNo={active_page - 2}
              isActive={active_page === active_page - 2}
              label={active_page - 2}
            />
            <PaginationButton
              pgNo={active_page - 1}
              isActive={active_page === active_page - 1}
              label={active_page - 1}
            />
            <PaginationButton
              pgNo={active_page}
              isActive={active_page === active_page}
              label={active_page}
            />
            <PaginationButton
              pgNo={active_page + 1}
              isActive={active_page === active_page + 1}
              label={active_page + 1}
            />
            <PaginationButton
              pgNo={active_page + 2}
              isActive={active_page === active_page + 2}
              label={active_page + 2}
            />
          </>
        )}

        {active_page !== total_pages && (
          <PaginationButton
            pgNo={active_page + 1}
            label={<HiArrowNarrowRight />}
          />
        )}
      </div>
    </div>
  );
};

const PaginationButton: React.FC<PageBtnProps> = ({
  pgNo,
  isActive,
  label,
}) => {
  return (
    <Link
      to={`${pgNo}`}
      className={`bg-dark flex content-center font-semibold cursor-pointer rounded-full ${
        isActive ? "bg-purple color-white" : "color-gray"
      }`}
      style={{ height: 35, width: 35 }}
    >
      {label}
    </Link>
  );
};
interface PageBtnProps {
  pgNo: number | string;
  isActive?: boolean;
  label: string | JSX.Element | number;
}
interface PropTypes {
  handleClick?: (page_no: number) => void;
  total_pages: number;
  active_page: number;
}
export default Paginate;
