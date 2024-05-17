import { FileType } from "@/enum";
import { cn, getMimeType } from "@/lib/utils";
import { CircleX } from "lucide-react";
import { useRef, useState } from "react";

type Props = {
  multiple?: boolean;
  type?: FileType;
  value?: FileList;
  className?: string;
  onChange: (files?: FileList) => void;
  name: string;
};

export default function UploadFile({
  multiple = false,
  type = FileType.image,
  className,
  value,
  name,
  onChange,
}: Props) {
  const mimeType = getMimeType(type);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const hadnleFiles = (files: FileList) => {
    console.log("handle files called....");
    if (!multiple && files.length > 1) {
      setError("multiple files detected, only one file is allowed");
      console.log("multiple files detected, only one file is allowed");
      return;
    }

    for (const file of files) {
      if (!mimeType.includes(file.type)) {
        setError(
          "file type not supported, suppoeted file types: " +
            mimeType.join(", ")
        );
        console.log(
          "file type not supported, suppoeted file types:",
          mimeType.join(", ")
        );
        return;
      }
    }

    // onChange(getFilesPaths(files));
    onChange(files);
  };

  // const getFilesPaths = (files: FileList) => {
  //   console.log("creating links...");
  //   const filePaths = [];
  //   for (const file of files) {
  //     const filePath = URL.createObjectURL(file);
  //     filePaths.push(filePath);
  //   }
  //   return filePaths;
  // };

  return (
    <div
      onClick={() => inputFileRef.current?.click()}
      onDrop={(e) => {
        e.preventDefault();
        const { files } = e.dataTransfer;

        hadnleFiles(files);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDragEnter={() => console.log("entered")}
      className={cn(
        "w-full h-full border border-dashed flex justify-center items-center relative",
        className
      )}
    >
      {value && value.length > 0 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onChange(undefined);
          }}
        >
          <CircleX className="transition-[colors,transform] hover:scale-110 text-red-800 hover:text-red-500 hover:bg-zinc-100 bg-zinc-200 rounded-full h-5 w-5 absolute -top-2 -right-2" />
        </button>
      )}
      {!value && <p>Upload here</p>}
      {value && value?.length > 0 && (
        <div className="flex flex-col">
          <img
            className="w full h-full object-cover"
            src={URL.createObjectURL(value?.[0])}
            alt="Room image"
          />
        </div>
      )}
      <input
        name={name}
        accept={mimeType.join(", ")}
        ref={inputFileRef}
        multiple={multiple}
        type="file"
        hidden
        onChange={(e) => {
          if (e.target.files) {
            hadnleFiles(e.target.files);
          }
        }}
      />
      <p className="text-sm text-center text-red-800">{error}</p>
    </div>
  );
}
