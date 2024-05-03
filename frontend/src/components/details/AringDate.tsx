import React, { FC, useState, useEffect } from "react";
import { convertRuntime, countDown } from "../../utils/Duration";
import Style from "./style/GredientText.module.css";
interface PropsType {
  air_date: Date;
  name: string;
  runtime: number;
  episode_number?: number;
}

const AringDate: FC<PropsType> = (props) => {
  const { air_date, name, runtime } = props;
  const [count, setCount] = useState(countDown(new Date(air_date)));
  const handleDecreaseMinutes = () => {
    setCount(countDown(new Date(air_date)));
  };
  return (
    <div
      className={`flex flex-col gap-30 rounded-xlg py-20 px-20 lg:px-50 ${Style.Container_Bg}`}
    >
      <span className="capitalize color-white text-regular color-white font-bold">
        Estimating next episode comming
      </span>
      <div
        className={`flex flex-col  sm:flex-row space-between sm:align-center gap-20 py-20 ${Style.GredientText}`}
      >
        <div className="flex flex-col gap-20">
          <span className="text-medium font-bold gredient-text">{name}</span>
          <span className="uppercase text-regular font-bold">
            {convertRuntime(runtime)}
          </span>
        </div>
        <article className="flex gap-20">
          {count.month > 0 && <Elements label="Month" count={count.month} />}
          {count.day > 0 && <Elements label="Day" count={count.day} />}
          {count.hours > 0 && <Elements label="Hour" count={count.hours} />}
          <Elements label="Minute" count={count.minutes} />
          <Seconds handleUpdateMin={handleDecreaseMinutes} />
        </article>
      </div>
    </div>
  );
};

const Elements: FC<{ count: number; label: string }> = ({ count, label }) => {
  return (
    <article className="flex flex-col gap-10 content-center sm:px-10 transition-all animate-1">
      <span
        className="count font-bold text-medium sm:text-heading"
        style={{ letterSpacing: 1 }}
      >
        {count < 10 ? `0${count}` : count}
      </span>
      <span
        className="label font-bold text-msm sm:text-regular uppercase"
        style={{ letterSpacing: 1.5 }}
      >
        {count > 1 ? `${label}s` : label}
      </span>
    </article>
  );
};

const Seconds: React.FC<{ handleUpdateMin: () => void }> = ({
  handleUpdateMin,
}) => {
  const [seconds, setSeconds] = useState(0);
  const calcSeconds = (): number => 60 - new Date().getSeconds();
  const startCountDown = setInterval(() => {
    setSeconds(calcSeconds());
  }, 1000);
  useEffect(() => {
    if (seconds === 1) {
      handleUpdateMin();
    }
    return () => {
      clearInterval(startCountDown);
    };
  }, [seconds]);
  return <Elements label="Second" count={seconds - 1} />;
};

export default AringDate;
