// import { FC, ReactNode } from "react";

// interface AuthLayoutProps {
//   children: ReactNode;
// }

// const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
//   return (
//     <div className="flex flex-col md:flex-row h-screen w-full">
//       <img
//         src="/auth.png"
//         alt="Auth"
//         className="hidden md:flex md:w-2/4 w-full h-screen"
//       />

//       <div className="md:hidden h-2/3 relative">
//         <img
//           src="/auth.png"
//           alt="Auth"
//           className="h-full w-full object-cover"
//         />
//         <div className="absolute bottom-0 left-0 right-0  h-20 bg-white rounded-t-full z-10"></div>
//         <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
//           <img src="/path/to/logo.png" alt="Logo" className="h-16 w-auto" />
//         </div>
//       </div>

//       <div className="w-full md:w-1/2 flex items-center justify-center">
//         <div className="max-w-md w-full pb-7">{children}</div>
//       </div>
//     </div>
//   );
// };

// export default AuthLayout;

import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full ">
      <img
        src="/auth.png"
        alt="Auth"
        className="hidden md:flex md:w-2/4 w-full h-screen"
      />

      <div className="md:hidden h-2/3 relative">
        <img
          src="/auth.png"
          alt="Auth"
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-white rounded-t-full z-10"></div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center ">
        <div className="max-w-md w-full pb-7">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
