const LineSegment: React.FC<{ className?: string }> = ({
  className,
  children,
}) => {
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
