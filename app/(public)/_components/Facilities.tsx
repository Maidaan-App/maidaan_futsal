import React from "react";
import {
  FaParking,
  FaHandHoldingWater,
  FaRestroom,
  FaFirstAid,
  FaShower,
  FaLock,
} from "react-icons/fa"; // Import necessary icons

const Facilities = () => {
  const features = [
    { icon: FaParking, title: "Parking" },
    { icon: FaHandHoldingWater, title: "Drinking Water" },
    { icon: FaRestroom, title: "Rest Room" },
    { icon: FaFirstAid, title: "First Aid" },
    { icon: FaShower, title: "Shower" },
    { icon: FaLock, title: "Locker Room" },
  ];

  return (
    <div className="py-16 px-6 flex flex-col items-center text-white">
      <h1 className="text-4xl font-bold mb-12 text-center">AMENITIES</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-6xl w-full">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex flex-col items-center p-8 rounded-lg `}
          >
            <feature.icon className="text-white text-6xl mb-6" />
            <p className="text-xl font-semibold">{feature.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facilities;
