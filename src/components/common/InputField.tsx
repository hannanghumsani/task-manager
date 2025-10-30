import React from "react";
import { FIELD_LABELS } from "../../language/constants";

interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  name: keyof typeof FIELD_LABELS;
  label?: string;
  isInvalid: boolean | undefined;
  validationMessage?: string;
  as?: "input" | "textarea";
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  isInvalid,
  validationMessage,
  as = "input",
  ...props
}) => {
  const defaultLabel = FIELD_LABELS[name] || name;

  // Base and conditional border classes
  // const baseClasses =
  //   "mt-1 block w-full rounded-md shadow-sm p-3 focus:ring-opacity-50 transition duration-150 ease-in-out";
  const baseClasses =
    "mt-1 block w-full rounded-md shadow-sm p-3 focus:ring-opacity-50 transition duration-150 ease-in-out border border-solid";

  const borderClasses = isInvalid
    ? "border-red-500 focus:border-red-500 focus:ring-red-500" // Invalid: Red border and ring
    : "border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400";

  // Color classes for light/dark mode
  const colorClasses =
    "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500";

  const finalClasses = `${baseClasses} ${borderClasses} ${colorClasses}`;

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label || defaultLabel}
      </label>

      {as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          className={finalClasses}
          rows={4}
          {...props}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={props.type || "text"}
          className={finalClasses}
          {...props}
        />
      )}

      {isInvalid && validationMessage && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">
          {validationMessage}
        </p>
      )}
    </div>
  );
};

export default InputField;
