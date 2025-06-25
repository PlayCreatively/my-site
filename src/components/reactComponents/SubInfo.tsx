import React from "react";
import { CSSProperties, useState } from "react";

interface ISubInfo {
  subInfo: React.ReactNode;
  hoverStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

const SubInfo: React.FC<ISubInfo> = ({ children, subInfo, hoverStyle }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Add state for position

  const subInfoEl = isVisible ? (
    <span
      style={{
        position: "absolute",
        top: `${position.y - 40}px`,
        left: `${position.x}px`,
        background: "white",
        color: "black",
        padding: ".3em",
        fontSize: "11px",
        font: "message-box",
        borderRadius: ".1em",
      }}
    >
      {subInfo}
    </span>
  ) : null;

  const style: CSSProperties = {
    ...(isVisible ? hoverStyle : {}),
    ...{ cursor: "help" },
  }; // Add cursor pointer to style

  const handleMouseOver = (event: React.MouseEvent<HTMLSpanElement>) => {
    setPosition({
      x:
        event.currentTarget.getBoundingClientRect().left +
        event.currentTarget.getBoundingClientRect().width +
        window.scrollX,
      y: event.currentTarget.getBoundingClientRect().top + window.scrollY,
    }); // Update position on mouse over
    setIsVisible(true);
  };

  return (
    <span
      className="Sub-info"
      onMouseOver={handleMouseOver}
      onMouseOut={() => setIsVisible(false)}
      style={style}
    >
      {children}
      {subInfoEl}
    </span>
  );
};

export default SubInfo;
