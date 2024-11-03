import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/ui/form";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <>loading</>,
});
const ReactQuillEditor = ({
  name,
  label,
}: {
  name: string;
  label?: string | undefined | null;
}) => {
  const {
    control,
    setValue,
    watch,
    formState: { isSubmitSuccessful },
  } = useFormContext();
  const values = watch();
  React.useEffect(() => {
    if (values[name] === "<p><br></p>") {
      setValue(name, "", {
        shouldValidate: !isSubmitSuccessful,
      });
    }
  }, [isSubmitSuccessful, name, setValue, values]);
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ["clean"], // remove formatting button
  ];
  const myModule = {
    toolbar: toolbarOptions,
  };
  return (
    <div className="flex flex-col gap-4 max-w-[full] h-64">
      {label && <Label>{label}</Label>}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <div className="h-full w-full">
              <ReactQuill
                modules={myModule}
                value={field.value}
                onChange={field.onChange}
                className="h-[70%] rounded-md"
              />
            </div>
            {error && <FormMessage>{error?.message}</FormMessage>}
          </>
        )}
      />
    </div>
  );
};
export default ReactQuillEditor;
