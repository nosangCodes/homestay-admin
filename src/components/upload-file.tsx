import { FileType } from "@/enum";
import { cn, getMimeType } from "@/lib/utils";
import { CircleX, Cross } from "lucide-react";
import { useRef } from "react";

type Props = {
  multiple?: boolean;
  type?: FileType;
  value?: FileList;
  className?: string;
  onChange: (files?: FileList) => void;
};

export default function UploadFile({
  multiple = false,
  type = FileType.image,
  className,
  value,
  onChange,
}: Props) {
  const mimeType = getMimeType(type);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const hadnleFiles = (files: FileList) => {
    if (!multiple && files.length > 1) {
      console.log("multiple files detected, only one file is allowed");
      return;
    }

    for (const file of files) {
      if (!mimeType.includes(file.type)) {
        console.log(
          "file type not supported, suppoeted file types:",
          mimeType.join(", ")
        );
        return;
      }
    }
    console.log("🚀 ~ hadnleFiles ~ files:", files);
    onChange(files);
  };

  const getFilesPaths = (files: FileList) => {
    const filePaths = [];
    for (const file of files) {
      const filePath = URL.createObjectURL(file);
      filePaths.push(filePath);
    }
    return filePaths;
  };

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
      {value && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange(undefined);
          }}
        >
          <CircleX className="transition-[colors,transform] hover:scale-110 text-red-800 hover:text-red-500 hover:bg-zinc-100 bg-zinc-200 rounded-full h-5 w-5 absolute -top-2 -right-2" />
        </button>
      )}
      {!value && <p>Upload here</p>}
      {value &&
        getFilesPaths(value).map((filePath) => (
          <img
            key={filePath}
            className="w full h-full object-cover"
            src={filePath}
            alt="Room image"
          />
        ))}

      <input
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
    </div>
  );
}
