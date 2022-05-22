import { ButtonHTMLAttributes, FC, memo } from "react";
import cn from "classnames";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  theme?: "basic" | "primary" | "secondary" | "red";
};

const Button: FC<ButtonProps> = ({ theme, ...rest }) => {
  let themeClass = cn("px-3 py-1  bg-blue-800 border text-white", {
    "bg-red-600 border-red-800 text-white rounded-md": theme === "red",
    "bg-blue-600  border-blue-800  text-white rounded-full": theme === "basic",
    "bg-blue-600  border-blue-800  text-white rounded-md": theme === "primary",
    "bg-transparent text-black border-black  rounded-md": theme === "secondary",
  });
  return <button className={cn(themeClass)} {...rest}></button>;
};

Button.defaultProps = { theme: "basic" };

export default memo(Button);
