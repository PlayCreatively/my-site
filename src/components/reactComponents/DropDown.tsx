import { useState } from "react";

interface IDropDown {
  title: string;
}

const DropDown: React.FC<IDropDown> = ({ title, children }) => {
  const [open, setopen] = useState(false);

  return (
    <div className="DropDown">
      <div className="Title" onClick={() => setopen(!open)}>
        <h2 style={{ margin: "0" }}>{title}</h2>
        <div>{open ? "˅" : "^"}</div>
      </div>
      <div className="Container" style={{ display: open ? "inherit" : "none" }}>
        {children}
      </div>
    </div>
  );
};

export default DropDown;
