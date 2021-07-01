import { ReactElement, useEffect, useRef } from "react";

// interface IDraw {
//   draw: (ctx: CanvasRenderingContext2D) => void;
// }

export default function Canvas(
  draw,
  // children: ReactElement[],
  ...props
) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const render = () => {
      draw.draw(ctx);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return (
    <canvas
      className="Canvas"
      ref={canvasRef}
      // {...props}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{ zIndex: 0 }}
    >
      {/* {{...children}} */}
    </canvas>
  );
}
