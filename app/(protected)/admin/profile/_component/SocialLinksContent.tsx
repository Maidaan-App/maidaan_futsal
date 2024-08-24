/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { poppins } from "@/app/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/customUI/input";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"; // Importing icons

const SocialLinksContent: React.FC = () => {
  const [socialLinks, setSocialLinks] = useState({
    facebook: "https://www.facebook.com/naxalfutsal",
    instagram: "https://www.instagram.com/naxalfutsal",
    linkedin: "https://www.linkedin.com/in/naxalfutsal",
    twitter: "https://www.x.com/naxalfutsal",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialLinks((prevLinks) => ({
      ...prevLinks,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Social Links Submitted:", socialLinks);
    // Here you can send the data to your backend or handle it as needed.
  };

  return (
    <div className={`${poppins.className} bg-white p-6 rounded-[12px]`}>
      <h2 className="text-lg font-medium mb-6 text-[#28353D]">Social Links</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Facebook */}
        <div className="relative flex items-center">
          <FaFacebook className="absolute left-3 w-[34px] h-[34px] text-blue-600" />
          <Input
            type="text"
            name="facebook"
            value={socialLinks.facebook}
            onChange={handleInputChange}
            className="w-full pl-16 border border-[#919EAB33] rounded-[8px] text-[16px] font-normal"
          />
        </div>

        {/* Instagram */}
        <div className="relative flex items-center">
          <FaInstagram className="absolute left-3 w-[34px] h-[34px] text-pink-500" />
          <Input
            type="text"
            name="instagram"
            value={socialLinks.instagram}
            onChange={handleInputChange}
            className="w-full pl-16 border border-[#919EAB33] rounded-[8px] text-[16px] font-normal"
          />
        </div>

        {/* LinkedIn */}
        <div className="relative flex items-center">
          <FaLinkedin className="absolute left-3 w-[34px] h-[34px] text-blue-700" />
          <Input
            type="text"
            name="linkedin"
            value={socialLinks.linkedin}
            onChange={handleInputChange}
            className="w-full pl-16 border border-[#919EAB33] rounded-[8px] text-[16px] font-normal"
          />
        </div>

        {/* X (Twitter) */}
        <div className="relative flex items-center">
          <FaTwitter className="absolute left-3 w-[34px] h-[34px] text-black" />
          <Input
            type="text"
            name="twitter"
            value={socialLinks.twitter}
            onChange={handleInputChange}
            className="w-full pl-16 border border-[#919EAB33] rounded-[8px] text-[16px] font-normal"
          />
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-end mt-6">
          <Button
            type="submit"
            variant="default"
            className="bg-[#00A86B] text-white"
          >
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SocialLinksContent;
