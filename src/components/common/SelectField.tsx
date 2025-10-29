import React from "react";
// Note: Assuming FIELD_LABELS is correctly imported from your structure
import { FIELD_LABELS } from "../../language/constants";
import clsx from "clsx";

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: keyof typeof FIELD_LABELS | "status" | "priority"; // Extend keys for Select
  label?: string;
  options: { value: string; label: string }[];
  isInvalid: boolean;
  validationMessage?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  isInvalid,
  validationMessage,
  ...props
}) => {
  const defaultLabel =
    FIELD_LABELS[name as keyof typeof FIELD_LABELS] ||
    name.charAt(0).toUpperCase() + name.slice(1);

  // --- AESTHETIC CHANGES START HERE ---

  // Base classes: Modern rounded corners, slightly more padded, and smooth appearance-none
  const baseClasses =
    "mt-1 block w-full shadow-md rounded-xl p-2 focus:ring-opacity-75 appearance-none transition duration-200 ease-in-out";

  // Border classes: Focused on the modern indigo/gray theme
  const borderClasses = isInvalid
    ? "border-2 border-red-500 focus:border-red-500 focus:ring-red-500" // Increased border width for invalid state
    : "border border-gray-200 dark:border-gray-700 focus:border-indigo-600 focus:ring-indigo-600 dark:focus:border-indigo-400 dark:focus:ring-indigo-400";

  // Color classes: Ensuring good contrast and clean look
  const colorClasses =
    "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:border-gray-400 dark:hover:border-gray-600";

  // Use clsx for cleaner class construction
  const finalClasses = clsx(
    baseClasses,
    borderClasses,
    colorClasses,
    props.className
  );

  // --- AESTHETIC CHANGES END HERE ---

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1" // Added font-semibold and margin-bottom for clarity
      >
        {label || defaultLabel}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          // Pass the combined classes, excluding props.className which is handled by clsx
          className={finalClasses}
          {...props}
        >
          <option
            value=""
            disabled
            className="text-gray-400 dark:text-gray-500"
          >
            Select...
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              // Enhanced option styling (might not work in all browsers, but good practice)
              className="dark:bg-gray-800 dark:text-gray-100"
            >
              {option.label}
            </option>
          ))}
        </select>
        {/* Aesthetic Down Arrow Icon (Updated position/color slightly) */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 dark:text-gray-400">
          <svg
            className="h-5 w-5" // Slightly larger icon
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {isInvalid && validationMessage && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium">
          {validationMessage}
        </p>
      )}
    </div>
  );
};

export default SelectField;
