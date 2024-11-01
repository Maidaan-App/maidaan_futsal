import React, { ReactNode } from "react";

import { currentUser } from "@/lib/auth";
import Footer from "./_components/Footer";
import Header from "./_components/Header";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = async ({ children }) => {
  const user = await currentUser();

  return (
    <div className="flex flex-col  min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
