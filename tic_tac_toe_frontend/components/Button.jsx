import React from "react";
import PropTypes from "prop-types";

/**
 * Button component that supports primary, secondary, success, and error variants.
 * Follows modern minimalistic, accessible, and responsive design per the style guide.
 * 
 * Props:
 * - children: node (content inside the button)
 * - variant: 'primary' | 'secondary' | 'success' | 'error' (default: 'primary')
 * - type: 'button' | 'submit' | 'reset' (default: 'button')
 * - onClick: function
 * - disabled: boolean
 * - className: additional custom classes
 * - ...rest: spreads other valid props onto the button
 * 
 * Usage example:
 *   <Button variant="primary">Primary Button</Button>
 */
// PUBLIC_INTERFACE
function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  disabled = false,
  className = "",
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm";
  const variants = {
    primary:
      "bg-[#3b82f6] text-white hover:bg-[#2563eb] focus:ring-[#3b82f6]",
    secondary:
      "bg-[#64748b] text-white hover:bg-[#475569] focus:ring-[#64748b]",
    success:
      "bg-[#06b6d4] text-white hover:bg-[#0891b2] focus:ring-[#06b6d4]",
    error:
      "bg-[#EF4444] text-white hover:bg-[#dc2626] focus:ring-[#EF4444]",
  };
  const disabledStyle =
    "opacity-60 cursor-not-allowed";

  return (
    <button
      type={type}
      className={[
        base,
        variants[variant] || variants.primary,
        disabled ? disabledStyle : "",
        className,
      ].join(" ")}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
  ]),
  type: PropTypes.oneOf([
    "button",
    "submit",
    "reset",
  ]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
