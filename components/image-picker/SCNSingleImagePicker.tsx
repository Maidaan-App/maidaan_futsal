"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import React, { useEffect, useRef } from "react";
import { Camera, Pencil, X } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { toast } from "sonner";
import { poppins } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { paths } from "@/lib/paths";

const pop = Poppins({ subsets: ["latin"], weight: ["300", "400", "500"] });

type Props = {
  schemaName: string;
  name?: string;
  variant?: "standard" | "imageBox" | "avatar" | "public" | "profile";
  accept?: string;
  onImageSelect?: () => void;
};

const SCNSingleImagePicker = ({
  name,
  schemaName,
  variant = "standard",
  accept = "image/*",
  onImageSelect,
}: Props) => {
  const [selectedImage, setSelectedImage] = React.useState<
    File | string | null
  >(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { control, setValue, watch, resetField, getValues } = useFormContext();
  const pathname = usePathname();

  const watcher = watch(schemaName);
  useEffect(() => {
    const value = getValues(schemaName);
    if (typeof value === "string") {
      setSelectedImage(getValues(schemaName));
    } else if (value instanceof File) {
      setSelectedImage(value);
    }
  }, [watcher]);

  const handleDeleteButtonClicked = () => {
    try {
      setValue(schemaName, null);
      setSelectedImage(null);
      resetField(schemaName);
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleContainerClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedImage(file);
    setValue(schemaName, file);
    if (onImageSelect) onImageSelect();
  };

  // Conditionally render the "Active" badge if the path is "/admin/profile"
  const isProfilePage = pathname === paths.admin.profile;

  if (variant === "standard") {
    return (
      <div className="flex flex-col gap-4 border-[1px] border-[#0A41CC] border-opacity-[10%] rounded-md">
        <Label htmlFor={schemaName}>{name}</Label>
        <Controller
          name={schemaName}
          control={control}
          render={({
            field: { value, onChange, ...fieldProps },
            fieldState: { error },
          }) => (
            <>
              <Input
                id={schemaName}
                multiple={false}
                {...fieldProps}
                ref={inputFileRef}
                placeholder="Picture"
                type="file"
                accept={accept}
                onChange={(event) => {
                  onChange(event.target.files && event.target.files[0]);
                  setSelectedImage(event.target.files?.[0] || null);
                }}
              />

              {!!error && (
                <Label
                  className={cn(
                    error && "text-red-500 dark:text-red-900 px-3  ",
                    ""
                  )}
                  htmlFor={schemaName}
                >
                  {error.message}
                </Label>
              )}
            </>
          )}
        />

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-32 h-32 rounded-lg"
            >
              <Image
                fill
                className="object-cover rounded-lg"
                src={
                  typeof selectedImage === "string"
                    ? selectedImage
                    : URL.createObjectURL(selectedImage)
                }
                alt="Selected"
              />
              <X
                onClick={handleDeleteButtonClicked}
                className="absolute top-0 right-0 bg-black rounded-full p-1  text-[#f1f1f1]"
              ></X>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  } else if (variant === "imageBox") {
    return (
      <div className="flex flex-col gap-2">
        {selectedImage == null ? (
          <>
            <div
              className={`w-auto bg-white dark:bg-gray-700 border h-auto py-5 gap-4 rounded-lg flex flex-col justify-center items-center hover:bg-slate-50 duration-300 ${pop.className}`}
              onClick={handleContainerClick}
            >
              <h1 className="mr-auto px-10 font-medium text-heading text-[1.1875rem]">
                {name}
              </h1>
              <img
                className="w-auto h-24"
                src={"/images/upload-image.png"}
                alt=""
              />
              <p className="font-medium text-[1.1875rem]">
                Drop or Select file
              </p>
              <p className="text-sm text-gray-400 px-10 text-center font-normal">
                Drop files here or click{" "}
                <span className="text-primary">browse</span> thorough your
                machine
              </p>
              <Controller
                name={schemaName}
                control={control}
                render={({
                  field: { value, onChange, ...fieldProps },
                  fieldState: { error },
                }) => (
                  <>
                    <Input
                      className="hidden"
                      id={schemaName}
                      multiple={false}
                      {...fieldProps}
                      ref={inputFileRef}
                      placeholder="Picture"
                      type="file"
                      accept={accept}
                      onChange={(event) => {
                        if (event.target.files && event.target.files[0]) {
                          const file = event.target.files[0];
                          if (file.size > 1024 * 1024) {
                            toast("File size must be less than 1 MB.");
                            return;
                          }
                        }
                        onChange(event.target.files && event.target.files[0]);
                        setSelectedImage(event.target.files?.[0] || null);
                      }}
                    />
                    {!!error && (
                      <Label
                        className={cn(
                          error && "text-red-500 dark:text-red-900 px-3  ",
                          ""
                        )}
                        htmlFor={schemaName}
                      >
                        {error.message}
                      </Label>
                    )}
                  </>
                )}
              />
            </div>
          </>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-auto h-60 rounded-lg"
            >
              <Image
                fill
                className="object-cover rounded-lg"
                src={
                  typeof selectedImage === "string"
                    ? selectedImage
                    : URL.createObjectURL(selectedImage)
                }
                alt="Selected"
              />
              <X
                onClick={handleDeleteButtonClicked}
                className="absolute top-0 right-0 bg-black rounded-full p-1  text-[#f1f1f1]"
              ></X>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    );
  } else if (variant === "avatar") {
    return (
      <div className="relative flex flex-col gap-2">
        {isProfilePage && (
          <span className="absolute top-7 right-5 bg-[#17C9641A] text-primary rounded-lg px-3 py-1 text-xs font-medium">
            Active
          </span>
        )}
        <Label
          htmlFor={schemaName}
          className={`${poppins.className} font-medium text-[1.1875rem]`}
        >
          {name}
        </Label>
        <div className="w-auto bg-white  h-[21.875rem] gap-4 rounded-lg flex flex-col justify-center items-center ">
          {selectedImage ? (
            <AnimatePresence>
              <motion.div
                className="relative bg-primary/5 hover:bg-primary/10 duration-300 cursor-pointer border rounded-full h-40 w-40 flex flex-col items-center justify-center text-gray-400 gap-2"
                onClick={handleContainerClick}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Selected image */}
                {selectedImage && (
                  <AnimatePresence>
                    <motion.div
                      onClick={handleContainerClick}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-full overflow-hidden"
                      style={{ width: "100%", height: "100%" }}
                    >
                      <img
                        className="object-cover w-full h-full"
                        src={
                          typeof selectedImage === "string"
                            ? selectedImage
                            : URL.createObjectURL(selectedImage)
                        }
                        alt="Selected"
                      />
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Overlay */}
                <AnimatePresence>
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black opacity-50 rounded-full" />

                    {/* Light content */}
                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <Camera className="text-[#f1f1f1]" size={24} />
                      <p className="text-sm text-[#f1f1f1] mt-2">
                        Upload photo
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="p-2 border rounded-full">
              <div
                className="
              bg-[#F6F7F8] hover:bg-slate-200
              duration-300 cursor-pointer   rounded-full h-40 w-40 flex flex-col items-center justify-center text-black gap-2"
                onClick={handleContainerClick}
              >
                <Camera />
                <p className="text-sm ">Upload photo</p>
              </div>
            </div>
          )}

          <Controller
            name={schemaName}
            control={control}
            render={({
              field: { value, onChange, ...fieldProps },
              fieldState: { error },
            }) => (
              <>
                <Input
                  className="hidden"
                  id={schemaName}
                  multiple={false}
                  {...fieldProps}
                  ref={inputFileRef}
                  placeholder="Picture"
                  type="file"
                  accept={accept}
                  onChange={(event) => {
                    onChange(event.target.files && event.target.files[0]);
                    setSelectedImage(event.target.files?.[0] || null);
                  }}
                />
                {!!error && (
                  <Label
                    className={cn(
                      error && "text-red-500 dark:text-red-900 px-3  ",
                      ""
                    )}
                    htmlFor={schemaName}
                  >
                    {error.message}
                  </Label>
                )}

                <p className="font-normal text-[#919EAB] text-[0.5rem] md:text-[0.75rem] lg:text-[0.875rem] text-center">
                  Allowed *.jpeg, *.jpg, *.png, *.gif <br />  max size of 3 Mb
                </p>
              </>
            )}
          />
        </div>
      </div>
    );
  } else if (variant === "public") {
    return (
      <div className="flex flex-col gap-4 ">
        <>
          <div
            className="w-[18.1875rem] bg-[#0A41CC] bg-opacity-[4%] dark:bg-gray-700 border border-[#0A41CC80] border-dashed h-[4.8125rem] gap-4 rounded-lg flex flex-col justify-center px-5 hover:bg-slate-100 duration-300"
            onClick={handleContainerClick}
          >
            <div className="flex items-center gap-2 ">
              <img
                src="/images/upload.png"
                alt=""
                className="w-[2.6875rem] h-[2.6875rem]"
              />
              <div>
                <p>{name}</p>
              </div>
            </div>
            <Controller
              name={schemaName}
              control={control}
              render={({
                field: { value, onChange, ...fieldProps },
                fieldState: { error },
              }) => (
                <>
                  <Input
                    id={schemaName}
                    className="hidden"
                    multiple={false}
                    {...fieldProps}
                    ref={inputFileRef}
                    placeholder="Picture"
                    type="file"
                    accept={accept}
                    onChange={(event) => {
                      onChange(event.target.files && event.target.files[0]);
                      setSelectedImage(event.target.files?.[0] || null);
                    }}
                  />
                  {!!error && (
                    <Label
                      className={cn(
                        error && "text-red-500 dark:text-red-900 px-3 ",
                        ""
                      )}
                      htmlFor={schemaName}
                    >
                      {error.message}
                    </Label>
                  )}
                </>
              )}
            />
          </div>
        </>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-32 h-32 rounded-lg"
            >
              <Image
                fill
                className="object-cover rounded-lg"
                src={
                  typeof selectedImage === "string"
                    ? selectedImage
                    : URL.createObjectURL(selectedImage)
                }
                alt="Selected"
              />
              <X
                onClick={handleDeleteButtonClicked}
                className="absolute top-0 right-0 bg-black rounded-full p-1  text-[#f1f1f1]"
              ></X>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  } else if (variant === "profile") {
    return (
      <div className="flex flex-col gap-2">
        <Label
          htmlFor={schemaName}
          className={`${poppins.className} font-medium text-[1rem] text-heading`}
        >
          {name}
        </Label>
        <div className="w-auto  my-5 gap-4 rounded-lg flex flex-col justify-center ">
          {selectedImage ? (
            <AnimatePresence>
              <motion.div
                className="relative bg-primary/5 hover:bg-primary/10 duration-300 cursor-pointer border rounded-full h-40 w-40 flex flex-col items-center justify-center text-gray-400 gap-2"
                onClick={handleContainerClick}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Selected image */}
                {selectedImage && (
                  <AnimatePresence>
                    <motion.div
                      onClick={handleContainerClick}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-full overflow-hidden"
                      style={{ width: "100%", height: "100%" }}
                    >
                      <img
                        className="object-cover w-full h-full"
                        src={
                          typeof selectedImage === "string"
                            ? selectedImage
                            : URL.createObjectURL(selectedImage)
                        }
                        alt="Selected"
                      />
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Overlay */}
                <AnimatePresence>
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity"
                    initial={{ opacity: 1 }}
                    whileHover={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Dark overlay */}
                    <div className="absolute inset-0  rounded-full" />

                    <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg cursor-pointer border ">
                      <Pencil className="h-[1rem] w-[1rem] text-secondary" />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div
              className="
              bg-profile hover:bg-slate-200 
              duration-300 cursor-pointer  border rounded-full h-40 w-40 flex flex-col items-center justify-center text-black gap-2"
              onClick={handleContainerClick}
            >
              <Camera />
              <p className="text-sm ">Upload Profile</p>
            </div>
          )}

          <Controller
            name={schemaName}
            control={control}
            render={({
              field: { value, onChange, ...fieldProps },
              fieldState: { error },
            }) => (
              <>
                <Input
                  className="hidden"
                  id={schemaName}
                  multiple={false}
                  {...fieldProps}
                  ref={inputFileRef}
                  placeholder="Picture"
                  type="file"
                  accept={accept}
                  onChange={(event) => {
                    onChange(event.target.files && event.target.files[0]);
                    setSelectedImage(event.target.files?.[0] || null);
                    if (onImageSelect) onImageSelect();
                  }}
                />
                {!!error && (
                  <Label
                    className={cn(
                      error && "text-red-500 dark:text-red-900 px-3  ",
                      ""
                    )}
                    htmlFor={schemaName}
                  >
                    {error.message}
                  </Label>
                )}
              </>
            )}
          />
        </div>
      </div>
    );
  }
};

export default SCNSingleImagePicker;
