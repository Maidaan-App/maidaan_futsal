import React, { ReactNode } from "react";
import { currentUser } from "@/lib/auth";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import TransitionWrapper from "./_components/TransitionWrapper";
import MobileMenu from "./_components/MobileMenu";
import { FUTSALPROFILE } from "@/lib/types"; // Import the type for the FutsalProfile if needed

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = async ({ children }) => {
  const user = await currentUser();

  // FutsalProfile can be fetched or passed as a prop, using a placeholder for now
  const futsalProfile: FUTSALPROFILE | undefined = undefined; // Replace with actual profile data if available

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow relative">
        {/* Floating Menu Button: Only visible on mobile */}
        <div className="fixed bottom-5 right-5 z-50 bg-blue-500 text-white p-4 rounded-full shadow-lg lg:hidden">
          <MobileMenu FutsalProfile={futsalProfile} />
        </div>

        <TransitionWrapper key={user?.id || "default-key"}>
          {children}
        </TransitionWrapper>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
