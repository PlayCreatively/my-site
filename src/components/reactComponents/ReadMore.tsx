import { useState } from "react";

const ReadMore: React.FC = ({ children }) => {
  const [open, setopen] = useState(false);

  return (
    <div className="ReadMore">
      <div style={{ overflow: "clip" }}>
        <div className="Content">{children}</div>
        <div
          className="grad"
          style={{
            height: "4em",
            position: "relative",
            zIndex: 10,
          }}
        />
      </div>
      <div className="Button">read more...</div>
    </div>
  );
};

export default ReadMore;
