import { FC } from "react";
import progressStyles from "./Progress.module.css";

const ProgressCircle: FC<PropsType> = ({
  radius,
  labelStyles,
  value,
  colorInnerRing,
  strokeWidth,
  styles,
}) => {
  if (value <= 0 && !value) return null;
  const r = radius;
  const calcPer = (value * 25 * 100) / 250;
  const pixelCount = ((100 - calcPer) * 250) / 100 + r;

  return (
    <div className={`flex z-1 ${styles && styles}`}>
      <div className="relative flex content-center align-center">
        <span
          className={`absolute flex color-white font-bold text-xsm sm:text-sm z-1 ${
            labelStyles && labelStyles
          }`}
          style={{ paddingTop: 3, paddingRight: 2 }}
        >
          {normalizeVote(value)}
        </span>
        <svg
          className={progressStyles.Progress_container}
          viewBox="0 0 100 100"
          data-pct="100"
        >
          <circle
            r={r}
            cx={45}
            cy={48}
            className={progressStyles.Progress_one}
            strokeWidth={strokeWidth ? `${strokeWidth}px` : ""}
            stroke={colorInnerRing}
          />
          <circle
            r={r}
            cx={45}
            cy={48}
            stroke={value < 6 ? "#f3a619" : "#00ac17"}
            className={progressStyles.Progress_two}
            strokeDashoffset={value === 1 ? 245 : pixelCount}
            strokeWidth={strokeWidth ? `${strokeWidth}px` : ""}
          />
        </svg>
      </div>
    </div>
  );
};

const normalizeVote = (vote: number): string => {
  if (!vote) {
    return "0";
  }
  return Number.isInteger(vote) ? vote.toString() : vote.toFixed(1).toString();
};

interface PropsType {
  value: number;
  radius: number;
  strokeWidth?: number;
  colorOuterRing?: string;
  colorInnerRing?: string;
  labelStyles?: string;
  styles?: string;
}

export default ProgressCircle;
