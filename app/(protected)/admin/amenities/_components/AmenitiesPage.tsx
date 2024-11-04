"use client";
import Loader from "@/components/Loader";
import { montserrat } from "@/lib/constants";
import {
  useAdminAddUpdateAmenitiesMutation,
  useGetAllAdminAmenitiesQuery,
} from "@/store/api/Admin/adminAmenities";
import React, { useState, useEffect } from "react";
import {
  FaParking,
  FaHandHoldingWater,
  FaRestroom,
  FaFirstAid,
  FaShower,
  FaLock,
} from "react-icons/fa";
import { toast } from "sonner";

const AmenitiesPage = () => {
  const [Loading, setLoading] = useState(false);
  const [AdminAddUpdateAmenities] = useAdminAddUpdateAmenitiesMutation();

  const { data: ExistingAmenities, isLoading: ExistingAmenitiesLoading } =
    useGetAllAdminAmenitiesQuery("");

  console.log("ExistingAmenities", ExistingAmenities);

  const defaultFeatures = [
    { icon: FaParking, title: "Parking", isAvailable: false },
    { icon: FaHandHoldingWater, title: "Drinking Water", isAvailable: false },
    { icon: FaRestroom, title: "Rest Room", isAvailable: false },
    { icon: FaFirstAid, title: "First Aid", isAvailable: false },
    { icon: FaShower, title: "Shower", isAvailable: false },
    { icon: FaLock, title: "Locker Room", isAvailable: false },
  ];

  const [features, setFeatures] = useState(defaultFeatures);
  const [newFeatureTitle, setNewFeatureTitle] = useState("");

  useEffect(() => {
    if (ExistingAmenities?.amenities) {
      const existingTitles = defaultFeatures.map((feature) => feature.title);

      const updatedFeatures = [
        ...defaultFeatures.map((feature) => {
          const matchedAmenity = ExistingAmenities.amenities.find(
            (amenity) => amenity.title === feature.title
          );
          return matchedAmenity
            ? { ...feature, isAvailable: matchedAmenity.isAvailable }
            : feature;
        }),
        ...ExistingAmenities.amenities
          .filter((amenity) => !existingTitles.includes(amenity.title))
          .map((newAmenity) => ({
            icon: FaLock, // Default icon for new amenities
            title: newAmenity.title,
            isAvailable: newAmenity.isAvailable,
          })),
      ];

      setFeatures(updatedFeatures);
    }
  }, [ExistingAmenities]);

  const handleCheckboxChange = (index: number) => {
    setFeatures((prevFeatures) =>
      prevFeatures.map((feature, i) =>
        i === index
          ? { ...feature, isAvailable: !feature.isAvailable }
          : feature
      )
    );
  };

  const handleAddFeature = () => {
    if (newFeatureTitle.trim() !== "") {
      setFeatures([
        ...features,
        { icon: FaLock, title: newFeatureTitle, isAvailable: true },
      ]);
      setNewFeatureTitle("");
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const availableFeatures = features.filter(
        (feature) => feature.isAvailable
      );
      const response = await AdminAddUpdateAmenities({
        _id: ExistingAmenities?._id ?? undefined,
        amenities: availableFeatures,
      }).unwrap();
      if (response) {
        toast.success(response.message);
        setLoading(false);
        window.location.reload();
      } else {
        toast.error(`Something Went Wrong`);
        setLoading(false);
      }
    } catch (error: any) {
      toast.error(error.data.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {ExistingAmenitiesLoading ? (
        <div className="flex h-[80vh] items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div
          className={`py-16 px-6 flex flex-col items-center ${montserrat.className}`}
        >
          <h1 className="text-3xl font-bold mb-12 text-center">AMENITIES</h1>

          {/* Add new feature input and button at the top */}
          <div className="w-full  flex justify-center mb-8 lg:px-8">
            <div className="flex items-center space-x-4 w-full">
              <input
                type="text"
                placeholder="Add new feature"
                value={newFeatureTitle}
                onChange={(e) => setNewFeatureTitle(e.target.value)}
                className="border p-3 rounded-lg flex-grow focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleAddFeature}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300 ease-in-out"
              >
                Add Feature
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-6xl w-full">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex flex-col items-center p-8 rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-105 border ${
                  feature.isAvailable ? "border-green-400" : "border-gray-300"
                }`}
              >
                <div
                  className={`text-4xl mb-6 ${
                    feature.isAvailable ? "text-green-500" : "text-gray-400"
                  }`}
                >
                  <feature.icon />
                </div>
                <p className="text-xl font-semibold">{feature.title}</p>
                <label className="mt-2">
                  <input
                    type="checkbox"
                    checked={feature.isAvailable}
                    onChange={() => handleCheckboxChange(index)}
                    className="mr-2"
                  />
                  Available
                </label>
              </div>
            ))}
          </div>

          <div className="flex justify-end w-full md:px-8">
            <button
              onClick={handleSubmit}
              disabled={Loading}
              className={`bg-green-500 hover:bg-green-600 text-white px-8 py-3 mt-12 rounded-lg transition duration-300 ease-in-out ${
                Loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {Loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AmenitiesPage;
