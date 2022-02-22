import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col w-full h-full justify-center items-center">
    {children}
  </div>
);

export default Container;
