"use client";
import { MINIOURL } from "@/lib/constants";
import { useGetAuthConfigQuery } from "@/store/api/Config/configs";
import { FC, ReactNode } from "react";
import Loader from "./Loader";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const { data: AuthConfigData, isLoading: AuthConfigLoading } =
    useGetAuthConfigQuery("");

  return (
    <>
      {AuthConfigLoading ? (
        <div className="flex h-[80vh] items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row h-screen w-full ">
          <>
            <img
              src={`${MINIOURL}${AuthConfigData?.bannerImage}`}
              alt="Auth"
              className="hidden md:flex md:w-2/4 w-full h-screen object-cover"
            />

            <div className="md:hidden h-2/3 relative">
              <img
                src={`${MINIOURL}${AuthConfigData?.bannerImage}`}
                alt="Auth"
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-white rounded-t-full z-10"></div>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center ">
              <div className="max-w-md w-full pb-7">{children}</div>
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default AuthLayout;
