"use client";

import { cn } from "@/lib/Utils";

type IButton = {
  title: string;
  className: string;
  type?: "button" | "submit" | "reset";
  isDisabled?: boolean;
  onClickHandler?: () => void;
  icon?: React.ReactNode | undefined;
};

const Button = ({
  title,
  className,
  type,
  isDisabled,
  onClickHandler,
  icon,
}: IButton) => {
  const default_styles =
    "  px-10 py-3  flex items-center justify-center gap-3 text-black text-center font-primary  text-base  md:text-lg font-bold title";
  return (
    <button
      type={type ?? "button"}
      className={cn(default_styles, className)}
      disabled={isDisabled ?? false}
      onClick={() => onClickHandler && onClickHandler()}
    >
      {title}
      {icon && icon}
    </button>
  );
};

export default Button;
