import React, { useState, useEffect } from "react";
import { PLACEHOLDERS } from "@/language/constants";

interface DebouncedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string | number;
  onChange: any;
  debounce?: number;
}

const DebouncedInput: React.FC<DebouncedInputProps> = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <div className="relative">
      <input
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={PLACEHOLDERS.search}
        className="block w-full rounded-full border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 pl-10 shadow-lg text-gray-900 dark:text-gray-100 focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
      />
      {/* Search Icon */}
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
};

export default DebouncedInput;
