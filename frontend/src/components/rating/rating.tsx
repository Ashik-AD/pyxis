import { FaStar, FaStarHalfStroke } from "react-icons/fa6";

export default function Rating({ rating }: { rating: number }) {
  let wholeStarCount = Math.floor(rating / 2) - 1;
  let needHalf = Math.round(rating % 2) > 0;
  let stars = Array(5).fill(0);
  return (
    <span className="flex flex-row gap-5">
      {stars.map((_, idx) => (
        <i key={idx}>
          {idx < wholeStarCount ? (
            <FaStar className={`color-warn`} />
          ) : needHalf && idx - wholeStarCount == 0 ? (
            <FaStarHalfStroke className="color-warn" />
          ) : (
            <FaStar className="color-gray" />
          )}
        </i>
      ))}
    </span>
  );
}
