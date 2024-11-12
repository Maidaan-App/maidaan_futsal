import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Props = {
  schemaName: string;
  multiple?: boolean;
  limit?: number;
  name: string;
  accept?: string;
};

const SCNMultiImagePicker = ({
  name,
  schemaName,
  multiple = true,
  limit,
  accept = "image/*",
}: Props) => {
  const [selectedFiles, setSelectedFiles] = React.useState<
    (string | File)[] | null
  >(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { control, setValue, getValues, setError } = useFormContext();

  useEffect(() => {
    const value = getValues(schemaName);
    if (Array.isArray(value)) {
      setSelectedFiles(value);
    }
  }, [schemaName]);

  const handleDeleteButtonClicked = (index: number) => {
    const updatedFiles = selectedFiles!.filter((_, i) => i !== index);
    setValue(schemaName, updatedFiles);
    setSelectedFiles(updatedFiles);
    if (inputFileRef.current && index === selectedFiles!.length - 1) {
      inputFileRef.current.value = "";
    }
  };

  const handleContainerClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      const newFiles = Array.from(files);
      if (limit && newFiles.length + (selectedFiles?.length ?? 0) > limit) {
        setError(schemaName, {
          type: "custom",
          message: `Cannot select more than ${limit} files`,
        });
        return;
      }
      if (multiple) {
        const updatedFiles = [...(selectedFiles || []), ...newFiles];
        setSelectedFiles(updatedFiles);
        setValue(schemaName, updatedFiles);
      } else {
        setSelectedFiles(newFiles);
        setValue(schemaName, newFiles);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor={schemaName}></Label>
      <div
        className="md:w-[20rem] bg-[#F0F4FC] dark:bg-gray-700 border border-[#0A41CC80] border-dashed h-[14.8125rem] gap-4 rounded-lg flex flex-col justify-center items-center hover:bg-slate-100 hover:shadow-md hover:scale-105 duration-300 p-2 md:p-0 cursor-pointer"
        onClick={handleContainerClick}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className=" gap-10 p-4  dark:bg-gray-800">
          <img
            src="/images/upload-image.svg"
            alt="Upload Icon"
            className="w-[10rem] h-[10rem] opacity-90"
          />
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Drop or Select File
            </p>
            <p className="text-sm text-gray-400">Drop Files here</p>
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
                multiple={multiple}
                {...fieldProps}
                ref={inputFileRef}
                placeholder="Picture"
                type="file"
                accept={accept}
                onChange={(event) => {
                  const files = event.target.files;
                  if (files && files.length > 0) {
                    for (let i = 0; i < files.length; i++) {
                      const file = files[i];
                      if (file.size > 1024 * 1024) {
                        toast("File size must be less than 1 MB.");
                        return;
                      }
                    }
                  }
                  if (files) {
                    const newFiles = Array.from(files);
                    if (
                      limit &&
                      newFiles.length + (selectedFiles?.length ?? 0) > limit
                    ) {
                      setError(schemaName, {
                        type: "custom",
                        message: `Cannot select more than ${limit}`,
                      });
                      return;
                    }
                    if (multiple) {
                      const updatedFiles = [...(value || []), ...newFiles];
                      setSelectedFiles(updatedFiles);
                      onChange(updatedFiles);
                    } else {
                      setSelectedFiles(newFiles);
                      onChange(newFiles);
                    }
                  }
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

      <div className="flex gap-4 flex-wrap">
        <AnimatePresence>
          {selectedFiles &&
            selectedFiles.map((file, index) => (
              <motion.div
                key={index}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative flex items-center gap-2 bg-white dark:bg-gray-800 shadow-md p-2 rounded-lg"
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
                  {typeof file === "string" ? (
                    <img
                      src="/images/image.png"
                      alt="image"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="image"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-medium dark:text-gray-300">
                    {typeof file === "string"
                      ? file
                      : file.name.slice(0, 23) + "..."}
                  </p>
                  <X
                    size={20}
                    onClick={() => handleDeleteButtonClicked(index)}
                    className="cursor-pointer bg-primary rounded-full p-1 text-white hover:bg-red-500 hover:text-white duration-300"
                  />
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SCNMultiImagePicker;
