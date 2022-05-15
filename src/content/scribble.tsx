
const Scribble = ({ color, viewBox }: { color?: string, viewBox?:string }) => {
  return (
    <svg
      viewBox= {viewBox ?? "126.537 27.829 48.649 28.575"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={{
          stroke: color ?? "white",
          fill: "none",
          strokeWidth: "9px",
          strokeLinecap: "round",
        }}
        d="M 132.533 41.801 C 131.853 56.947 136.513 33.67 139.722 33.98 C 146.575 34.643 137.414 48.787 142.296 47.695 C 145.097 47.068 145.16 33.387 150.45 34.836 C 153.933 35.79 143.732 46.311 147.941 47.068 C 151.279 47.669 155.477 32.863 159.232 34.522 C 163.729 36.509 150.67 48.241 153.587 49.577 C 157.272 51.264 163.326 36.796 167.387 37.345 C 171.943 37.96 162.055 44.805 162.055 48.636"
      />
    </svg>
  );
};

export default Scribble;
