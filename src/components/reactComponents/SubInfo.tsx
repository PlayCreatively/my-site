import { useState } from "react";
// import { useEffect } from "react";
// import { useRef } from "react";

interface ISubInfo {
  subInfo: HTMLElement;
}

const SubInfo: React.FC<ISubInfo> = ({ children, subInfo }) => {
  const [isVisible, setIsVisible] = useState(false);
  var subInfoEl;

  subInfoEl = isVisible ? subInfo : null;
  return (
    <div
      className="Sub-info"
      onMouseOver={() => setIsVisible(true)}
      onMouseOut={() => setIsVisible(false)}
    >
      {children}
      <div style={{ position: "absolute", right: "2em" }}>{subInfoEl}</div>
    </div>
  );
};

export default SubInfo;
