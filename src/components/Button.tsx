import React from "react";
import "./LatteButton.scss";

interface LatteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function LatteButton({ children, className = "", ...props }: LatteButtonProps) {
  return (
    <button {...props} className={`latte-button ${className}`}>
      {children}
    </button>
  );
}
