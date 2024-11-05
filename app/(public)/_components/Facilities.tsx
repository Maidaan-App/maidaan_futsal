import { montserrat } from "@/lib/constants";
import React from "react";
import {
  FaParking,
  FaHandHoldingWater,
  FaRestroom,
  FaFirstAid,
  FaShower,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { AMENITIESDETAIL } from "@/lib/types";

interface Props {
  AmenitiesData: AMENITIESDETAIL[];
}

const Facilities = ({ AmenitiesData }: Props) => {
  // Icon map to match titles with corresponding icons
  const iconMap: Record<string, React.ComponentType> = {
    Parking: FaParking,
    "Drinking Water": FaHandHoldingWater,
    "Rest Room": FaRestroom,
    "First Aid": FaFirstAid,
    Shower: FaShower,
    "Locker Room": FaLock,
  };

  // Filter to get only available amenities and map titles to icons
  const availableFeatures = AmenitiesData.filter(
    (amenity) => amenity.isAvailable
  ).map((amenity) => ({
    icon: iconMap[amenity.title] || FaCheckCircle, // Use FaLock as default icon
    title: amenity.title,
  }));

  return (
    <div
      className={`py-16 px-6 flex flex-col items-center text-[#f1f1f1] ${montserrat.className}`}
    >
      <h1 className="text-4xl font-bold mb-12 text-center">AMENITIES</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-6xl w-full">
        {availableFeatures.map((feature, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center p-8 rounded-lg transition-transform duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="text-[#f1f1f1] text-6xl mb-6"
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <feature.icon />
            </motion.div>
            <p className="text-xl font-semibold">{feature.title}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Facilities;
