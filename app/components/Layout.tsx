import { ReactElement } from "react";
import Title from "./Title";

interface LayoutProps {
  children: ReactElement;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div
      className={`flex flex-col w-9/12 max-sm:w-screen max-sm:p-2 text-gray-400 p-6`}
    >
      <Title text="CRUD NEXT.JS" />
      <div className="">{children}</div>
    </div>
  );
}
