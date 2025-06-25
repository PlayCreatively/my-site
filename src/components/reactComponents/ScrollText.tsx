import React from "react";

const ScrollText: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="ScrollText">
      <p>{children}</p>
    </div>
  );
};

export default ScrollText;
