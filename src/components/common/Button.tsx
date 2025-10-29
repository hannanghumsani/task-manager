import React from "react";
import clsx from "clsx"; // Assuming clsx is installed for conditional classes

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  children,
  ...props
}) => {
  const baseClasses =
    "font-semibold py-2 px-4 rounded-lg transition duration-150 ease-in-out shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center";

  const variantClasses = {
    primary:
      "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50",
    secondary:
      "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100",
    danger:
      "bg-red-600 hover:bg-red-700 text-white focus:ring-4 focus:ring-red-500 focus:ring-opacity-50",
  }[variant];

  return (
    <button className={clsx(baseClasses, variantClasses, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
