import { cn } from "@/lib/Utils";
import { ReactNode } from "react";

type BrandButton = {
  text: ReactNode;
  icon?: ReactNode;
  onClick?: () => void; 
  className?: string;
};
const BrandButton = ({ text, icon, onClick, className }: BrandButton) => {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={cn("relative inline-flex items-center justify-center px-2 py-2 md:py-3 md:px-3  overflow-hidden font-primary font-bold text-normal border bg-primary rounded-md group", className)}
      >
        <span className="absolute w-0 h-0 transition-all duration-700 ease-out bg-primary-100 rounded-full group-hover:w-56 group-hover:h-56"></span>
        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg"></span>
        <span className="relative uppercase flex text-xs md:text-sm items-center title group-hover:text-white gap-2">
          {text} {icon}
        </span>
      </button>
    </>
  );
};

export default BrandButton;
