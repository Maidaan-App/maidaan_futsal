import React from "react";
import GalleryPage from "./_components/GalleryPage";
import { currentUser } from "@/lib/auth";

const Page = async () => {
  const current_user = await currentUser();

  return <GalleryPage current_user={current_user} />;
};

export default Page;
