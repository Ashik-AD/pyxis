import { CSSProperties } from "react";

const ShowWaitOverlay = () => {
  const contianerStyle: CSSProperties = {
    position: "absolute",
    height: "100%",
    width: "100%",
    display: "flex",
    background: "rgba(0, 0, 0, 0.5)",
    top: "0",
    left: "0",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
    zIndex: 1,
  };
  return (
    <div style={contianerStyle}>
      <svg height="60" width="60">
        <defs>
          <linearGradient id="strokeBg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0" style={{ stopColor: "#fff", stopOpacity: 1 }} />
            <stop
              offset="100%"
              style={{
                stopColor: "rgba(255, 255, 255, 0.1)",
                stopOpacity: 1,
              }}
            />
          </linearGradient>
        </defs>
        <circle
          fill="transparent"
          cx="30"
          cy="30"
          r="20"
          stroke="url(#strokeBg)"
          strokeWidth="5"
          strokeDasharray="100"
          strokeLinecap="round"
        ></circle>

        <animateTransform
          attributeName="transform"
          attributeType="XML"
          dur="1s"
          type="rotate"
          from="0"
          to="360"
          repeatCount="indefinite"
        />
      </svg>
    </div>
  );
};

export default ShowWaitOverlay;
