import { ReactNode } from "react";

type BrandButton = {
  text: ReactNode;
};

const WhiteButton = ({ text }: BrandButton) => {
  return (
    <>
      <button
        type="button"
        className="relative inline-flex items-center justify-center px-5 py-3 overflow-hidden font-display-Poppins font-medium  text-gray-700 border-none shadow-2xl bg-white rounded-lg group"
      >
        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#d0faf8] rounded-full group-hover:w-56 group-hover:h-56"></span>
        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg"></span>
        <span className="relative uppercase">{text}</span>
      </button>
    </>
  );
};

export default WhiteButton;
