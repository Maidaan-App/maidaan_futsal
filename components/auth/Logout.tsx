// "use client"
// import { logout } from "@/actions/logout";
// import { Button } from "@/components/ui/button";
// import React from "react";

// const Logout = () => {
//   const handleLogout = () => {
//     logout();
//   };
//   return (
//     <p onClick={handleLogout} className="text-black  w-full p-1  cursor-pointer rounded-md">
//       Logout
//     </p>
//   );
// };

// export default Logout;

"use client"
import { logout } from "@/actions/logout";
import React from "react";

const Logout = () => {
  const handleLogout = () => {
    logout();
  };
  return (
    <p onClick={handleLogout} className=" w-full p-1  cursor-pointer rounded-md">
      Logout
    </p>
  );
};

export default Logout;

