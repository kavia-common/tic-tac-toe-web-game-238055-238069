import React from "react";
import PropTypes from "prop-types";

/**
 * Button component - Modern, minimal, accessible, and theme-aware.
 * 
 * PUBLIC_INTERFACE
 * @param {string} children - Content inside the button.
 * @param {string} type - "button", "submit", or "reset"
 * @param {function} onClick - Click handler.
 * @param {boolean} disabled - If button is disabled.
 * @param {string} variant - "primary" | "secondary" | "success" | "error"
 * @param {string} className - Additional class names.
 * @returns {JSX.Element} Button element.
 */
const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
  ...props
}) => {
  // Theme colors from style guide
  const theme = {
    primary: {
      bg: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-300",
      text: "text-white",
    },
    secondary: {
      bg: "bg-slate-500 hover:bg-slate-600 active:bg-slate-700 focus:ring-slate-300",
      text: "text-white",
    },
    success: {
      bg: "bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 focus:ring-cyan-300",
      text: "text-white",
    },
    error: {
      bg: "bg-red-500 hover:bg-red-600 active:bg-red-700 focus:ring-red-300",
      text: "text-white",
    },
  };

  const base =
    "inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed text-base min-w-[2.5rem] min-h-[2.5rem] select-none";
  const color = theme[variant] || theme.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${color.bg} ${color.text} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(["primary", "secondary", "success", "error"]),
  className: PropTypes.string,
};

export default Button;
