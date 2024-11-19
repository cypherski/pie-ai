import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export const Card = ({ children, className = '', hover = false }) => {
  const baseClass = `bg-white/5 backdrop-blur-sm rounded-lg ${className}`;

  return hover ? (
    <motion.div whileHover={{ scale: 1.02 }} className={baseClass}>
      {children}
    </motion.div>
  ) : (
    <div className={baseClass}>{children}</div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hover: PropTypes.bool,
};

export const Panel = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-white/5',
    dark: 'bg-black/20',
    light: 'bg-white/10',
  };

  return <div className={`${variants[variant]} backdrop-blur-sm rounded-lg p-4`}>{children}</div>;
};

Panel.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'dark', 'light']),
};

export const Button = ({
  children,
  variant = 'primary',
  onClick,
  className = '',
  disabled = false,
  ...props
}) => {
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-purple-500 hover:bg-purple-600 text-white',
    ghost: 'bg-white/10 hover:bg-white/20 text-white',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-lg font-medium transition-colors
        ${variants[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export const Input = ({ type = 'text', placeholder, value, onChange, className = '' }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`
        w-full px-4 py-2 rounded-lg
        bg-white/5 backdrop-blur-sm
        border border-white/10
        text-white placeholder-white/50
        focus:outline-none focus:border-blue-500
        ${className}
      `}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export const LoadingSpinner = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className={`animate-spin ${sizes[size]}`}>
      <svg className="w-full h-full" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

// Set default props where applicable
Card.defaultProps = {
  className: '',
  hover: false,
};

Panel.defaultProps = {
  variant: 'default',
};

Button.defaultProps = {
  variant: 'primary',
  className: '',
  disabled: false,
  onClick: () => {},
};

Input.defaultProps = {
  type: 'text',
  className: '',
  placeholder: '',
};

LoadingSpinner.defaultProps = {
  size: 'md',
};
