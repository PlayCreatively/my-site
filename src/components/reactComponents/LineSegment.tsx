import React from "react";

const LineSegment: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className, children }) => {
  return (
    <div
      className={
        "LineSegment" + (className !== undefined ? " " + className : "")
      }
    >
      <p>{children}</p>
    </div>
  );
};

export default LineSegment;
