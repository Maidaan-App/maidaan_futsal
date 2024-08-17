// components/AuthLayout.tsx
import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-full">
        <img
          src="/auth.png"
          alt="Auth"
          className="w-[50rem] h-screen"
        />
      <div className="w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
