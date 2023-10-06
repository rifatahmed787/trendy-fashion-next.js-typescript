import Image from "next/image";
import { useState } from "react";

type FileInputProps = {
  label?: string;
  onChange: (file: File | undefined) => void;
  currentFile?: File | undefined;
  placeholder: string;
  className?: string;
  required?: boolean;
  currentValue: string | number;
  htmlFor?: string;
  id?: string;
};

const FileInput = ({
  label,
  onChange,
  placeholder,
  className,
  required,
  id,
}: FileInputProps) => {
  const [previewURL, setPreviewURL] = useState<string | undefined>(undefined);

  const defaultClassValue = `block py-1 px-0 w-full text-sm text-gray-900 bg-transparent  border-2 border-primary appearance-none rounded-md focus:outline-none focus:ring-0 focus:border-primary peer focus:border-t-1 pl-2`;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || undefined;
    onChange(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setPreviewURL(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewURL(undefined);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor={id || "dropzone-file"}
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500  relative"
      >
        {/* Hidden Input Field */}
        <input
          id="dropzone-file"
          type="file"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleFileChange}
          required={required ?? false}
          placeholder={placeholder}
        />

        {/* Preview Image */}
        {previewURL ? (
          <Image
            src={previewURL}
            alt="File Preview"
            className="w-1/2 mx-auto mb-4"
            width={100}
            height={100}
          />
        ) : (
          <>
            {/* SVG Icon */}
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>

            {/* Text */}
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
          </>
        )}
      </label>
    </div>
  );
};

export default FileInput;
