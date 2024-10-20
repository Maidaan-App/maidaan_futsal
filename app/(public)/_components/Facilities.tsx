import { montserrat } from "@/lib/constants";
import React from "react";
import {
  FaParking,
  FaHandHoldingWater,
  FaRestroom,
  FaFirstAid,
  FaShower,
  FaLock,
} from "react-icons/fa"; // Import necessary icons
import { motion } from "framer-motion"; // Import motion for animations

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
    <div
      className={`py-16 px-6 flex flex-col items-center text-[#f1f1f1] ${montserrat.className}`}
    >
      <h1 className="text-4xl font-bold mb-12 text-center">AMENITIES</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-6xl w-full">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`flex flex-col items-center p-8 rounded-lg transition-transform duration-300`}
            initial={{ opacity: 0, y: 50 }} // Initial state for entrance animation
            whileInView={{ opacity: 1, y: 0 }} // Final state when in view
            exit={{ opacity: 0, y: 50 }} // Exit animation
            transition={{ duration: 0.5, delay: index * 0.1 }} // Add delay for each item
            whileHover={{ scale: 1.05 }} // Scale effect on hover
          >
            <motion.div
              className="text-[#f1f1f1] text-6xl mb-6"
              whileHover={{ rotate: 15 }} // Rotate icon on hover
              transition={{ type: "spring", stiffness: 300 }} // Spring animation
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
