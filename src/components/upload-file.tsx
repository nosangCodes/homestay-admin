import { FileType } from "@/enum";
import { cn, getMimeType } from "@/lib/utils";
import { FileLinkObject } from "@/types";
import { CircleX } from "lucide-react";
import { useEffect, useRef, useState } from "react";



type Props = {
  multiple?: boolean;
  type?: FileType;
  value?: (File | FileLinkObject)[];
  className?: string;
  onChange: (files?: (File | FileLinkObject)[]) => void;
  name: string;
};

type ImageCardProps = {
  onRemove: () => void;
  file: File | FileLinkObject;
};

export function ImageCard({ file, onRemove }: ImageCardProps) {
  if (!(file instanceof File) && file?.removed) return;
  const isFileObject = file instanceof File;
  const src = isFileObject ? URL.createObjectURL(file) : (file.url as string);
  return (
    <div className="w-full sm:w-[300px] flex justify-center items-center relative p-2 aspect-square">
      <button
        className="absolute -top-0 -right-0"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        <CircleX className="transition-[colors,transform] hover:scale-125 text-red-800 hover:text-red-500 hover:bg-zinc-100 bg-zinc-200 rounded-full h-4 w-4 " />
      </button>
      <img className="object-cover h-full w-full" src={src} alt="Room image" />
    </div>
  );
}

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
  const [files, setFiles] = useState<(FileLinkObject | File)[]>([]);

  useEffect(() => {
    if (value instanceof FileList) {
      setFiles(Array.from(value));
    } else if (Array.isArray(value)) {
      setFiles(value);
    } else {
      setFiles([]);
    }
  }, [value]);


  const hadnleFiles = (fileList: FileList) => {
    const filesArray = Array.from(fileList);
    setError("");
    console.log("handle files called....");
    if (!multiple && filesArray.length > 1) {
      setError("multiple files detected, only one file is allowed");
      console.log("multiple files detected, only one file is allowed");
      return;
    }

    for (const file of filesArray) {
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

    const updatedFiles = multiple ? [...files, ...filesArray] : filesArray;
    updateFileList(updatedFiles);
  };

  const handleRemoveFile = (
    _id?: number | null,
    fileToRemove?: File | FileLinkObject
  ) => {
    console.log("🚀 ~ fileToRemove:", fileToRemove);
    const tempFiles = [...files];
    let updatedFiles: (File | FileLinkObject)[] = [];

    if (!(fileToRemove instanceof File) && fileToRemove?.id) {
      updatedFiles = tempFiles.map((file) =>
        file.name === fileToRemove.name ? { ...file, removed: true } : file
      );
    } else {
      updatedFiles = tempFiles.filter((file) => file !== fileToRemove);
    }

    setFiles([...updatedFiles]);
    updateFileList(updatedFiles);
  };

  const updateFileList = (fileArray: (File | FileLinkObject)[]) => {
    const dataTransfer = new DataTransfer();
    const fileObjects = fileArray.filter(
      (file) => file instanceof File
    ) as File[];

    console.log("🚀 BEFORE ~ updateFileList ~ fileObjects:", fileObjects);
    fileObjects.forEach((file) => dataTransfer.items.add(file));
    console.log("🚀 AFTER ~ updateFileList ~ fileObjects:", fileObjects);

    // Combine files and URLs for onChange callback
    const updatedValue = [
      ...fileObjects,
      ...fileArray.filter((file) => !(file instanceof File)),
    ];

    console.log("🚀 ~ updateFileList ~ updatedValue:", updatedValue);
    onChange(updatedValue);
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
      className={cn(
        "w-full h-full border border-dashed flex justify-center items-center relative p-2",
        className
      )}
    >
      {!files || (files.length === 0 && <p>Upload here</p>)}
      {files && files?.length > 0 && (
        <div className="flex flex-wrap gap-4 justify-center">
          {files.map((file: FileLinkObject | File) => (
            <ImageCard
              onRemove={() =>
                handleRemoveFile(
                  !(file instanceof File) ? file?.id : null,
                  file
                )
              }
              file={file}
              key={typeof file === "string" ? file : file.name}
            />
          ))}
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
      {error && <p className="text-sm text-center text-red-800">{error}</p>}
    </div>
  );
}
