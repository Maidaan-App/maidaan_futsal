import React from "react";
import AdminDashboard from "./components/admin-dashboard";
import { currentUser } from "@/lib/auth";

const Admin =async () => {
  const current_user = await currentUser();

  return (
    <AdminDashboard current_user={current_user}/>
  );
};

export default Admin;
