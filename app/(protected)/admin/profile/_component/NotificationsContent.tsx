import { poppins } from "@/app/lib/constants";
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";

type ActivityNotifications = {
  comment: boolean;
  form: boolean;
  booking: boolean;
};

type ApplicationNotifications = {
  news: boolean;
  accountActivity: boolean;
  newBrowser: boolean;
  newDevice: boolean;
};

const NotificationsContent: React.FC = () => {
  const [activityNotifications, setActivityNotifications] =
    useState<ActivityNotifications>({
      comment: true,
      form: true,
      booking: false,
    });

  const [applicationNotifications, setApplicationNotifications] =
    useState<ApplicationNotifications>({
      news: true,
      accountActivity: false,
      newBrowser: true,
      newDevice: true,
    });

  const handleActivityChange = (key: keyof ActivityNotifications) => {
    setActivityNotifications((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleApplicationChange = (key: keyof ApplicationNotifications) => {
    setApplicationNotifications((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleSaveChanges = () => {
    console.log("Activity Notifications:", activityNotifications);
    console.log("Application Notifications:", applicationNotifications);

    // Here you can also send the data to the backend using an API call
    // Example:
    // fetch('/api/notifications', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ activityNotifications, applicationNotifications }),
    // })
    // .then(response => response.json())
    // .then(data => console.log('Success:', data))
    // .catch((error) => console.error('Error:', error));
  };

  return (
    <div className={`${poppins.className} bg-white p-6 rounded-[12px]`}>
      <h2 className="lg:text-lg text-sm font-medium mb-2 text-[#28353D]">
        Notifications
      </h2>
      <p className="text-[#8A92A6] font-normal text-xs lg:text-base mb-6">
        Change notification options according to your preferences
      </p>

      {/* Activity Section */}
      <div className="bg-[#8A92A612] p-6 rounded-[12px] mb-6">
        <h3 className="lg:text-lg text-sm font-medium text-[#28353D] mb-6">
          Activity
        </h3>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <p className="lg:text-base text-xs  text-[#52525B] font-normal">
              Email me when someone comments on my article
            </p>
            <Switch
              checked={activityNotifications.comment}
              onCheckedChange={() => handleActivityChange("comment")}
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="lg:text-base text-xs  text-[#52525B] font-normal">
              Email me when someone answers on my form
            </p>
            <Switch
              checked={activityNotifications.form}
              onCheckedChange={() => handleActivityChange("form")}
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="lg:text-base text-xs  text-[#52525B] font-normal">
              Email me when someone books the slot
            </p>
            <Switch
              checked={activityNotifications.booking}
              onCheckedChange={() => handleActivityChange("booking")}
            />
          </div>
        </div>
      </div>

      {/* Application Section */}
      <div className="bg-[#8A92A612] p-6 rounded-[12px] mb-6">
        <h3 className="lg:text-lg text-sm font-medium text-[#28353D] mb-6">
          Application
        </h3>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <p className="lg:text-base text-xs  text-[#52525B] font-normal">
              News and announcements
            </p>
            <Switch
              checked={applicationNotifications.news}
              onCheckedChange={() => handleApplicationChange("news")}
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="lg:text-base text-xs  text-[#52525B] font-normal">
              Account activity
            </p>
            <Switch
              checked={applicationNotifications.accountActivity}
              onCheckedChange={() => handleApplicationChange("accountActivity")}
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="lg:text-base text-xs  text-[#52525B] font-normal">
              A new browser used to sign in
            </p>
            <Switch
              checked={applicationNotifications.newBrowser}
              onCheckedChange={() => handleApplicationChange("newBrowser")}
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="lg:text-base text-xs text-[#52525B] font-normal">
              A new device is linked
            </p>
            <Switch
              checked={applicationNotifications.newDevice}
              onCheckedChange={() => handleApplicationChange("newDevice")}
            />
          </div>
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end">
        <button
          className="bg-[#00A86B] text-white py-2 px-4 rounded-lg"
          onClick={handleSaveChanges}
        >
          Save changes
        </button>
      </div>
    </div>
  );
};

export default NotificationsContent;
