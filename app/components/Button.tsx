import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
}

export default function Button({ name, ...rest }: ButtonProps) {
  return (
    <button
      className={`px-8 py-1 bg-blue-900 rounded-sm  hover:bg-blue-700 hover:text-white transition-all`}
    >
      {name}
    </button>
  );
}
