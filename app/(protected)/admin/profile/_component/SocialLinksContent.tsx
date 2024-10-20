/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { poppins } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/customUI/input";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"; // Importing icons
import { useAdminAddUpdateProfileMutation } from "@/store/api/Admin/adminProfile";
import { toast } from "sonner";
import { FUTSALPROFILE } from "@/lib/types";

interface props {
  ProfileDetail: FUTSALPROFILE | undefined;
}

const SocialLinksContent = ({ ProfileDetail }: props) => {
  const [loading, setLoading] = useState(false);
  const [socialLinks, setSocialLinks] = useState<any>();
  const [AdminAddUpdateProfile] = useAdminAddUpdateProfileMutation();

  useEffect(() => {
    if (ProfileDetail?.socialLinks) {
      setSocialLinks(ProfileDetail.socialLinks);
    }
  }, [ProfileDetail]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialLinks((prevLinks: any) => ({
      ...prevLinks,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      setLoading(true);

      const response = await AdminAddUpdateProfile({
        _id: ProfileDetail?._id,
        socialLinks: socialLinks,
      }).unwrap();
      if (response) {
        toast.success(response.message);
        setLoading(false);
      } else {
        toast.error(`Couldn't Update Profile`);
        setLoading(false);
      }
    } catch (error: any) {
      // toast.error(`Something went wrong !!`);
      toast.error(error.data.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
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
            placeholder="Facebook URL"
            value={socialLinks?.facebook}
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
            placeholder="Instagram URL"
            value={socialLinks?.instagram}
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
            placeholder="LinkedIn URL"
            value={socialLinks?.linkedin}
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
            placeholder="Twitter URL"
            value={socialLinks?.twitter}
            onChange={handleInputChange}
            className="w-full pl-16 border border-[#919EAB33] rounded-[8px] text-[16px] font-normal"
          />
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-end mt-6">
          <Button
            type="submit"
            variant="default"
            className="bg-[#00A86B] text-[#f1f1f1]"
            disabled={loading}
          >
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SocialLinksContent;
