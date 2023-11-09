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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || undefined;
    if (file) {
      setSelectedFile(file);
      onChange(file);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor={id || "dropzone-file"}
        className="flex flex-col items-center justify-center w-full h-14 border-2 border-primary-100 border-dashed rounded-lg cursor-pointer bg-gray-50   hover:bg-gray-100 relative"
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

        <>
          {/* Text */}
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {selectedFile ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Selected File:</span>{" "}
                {selectedFile.name}
              </p>
            ) : (
              <>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </>
            )}
          </div>
        </>
      </label>
    </div>
  );
};

export default FileInput;
