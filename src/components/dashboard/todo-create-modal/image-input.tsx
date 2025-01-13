import { useEffect, useRef, useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { JhButton } from "../../../core/ui/jh-button";
import { JHInput } from "../../../core/ui/jh-input";
import Image from "next/image";

export const ImageInput: React.FC = () => {
  const imgInputRef = useRef<HTMLInputElement>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const handleChangeImg = () => {
    if (imgInputRef.current) {
      imgInputRef.current.click();
    }
  };

  const handleDelete = () => {
    setImgFile(null);
    setPreview("");
    URL.revokeObjectURL(preview);
    if (imgInputRef.current) {
      imgInputRef.current.value = "";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImgFile(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [imgFile]);

  return (
    <div className="flex flex-col">
      <label htmlFor="image">{"이미지"}</label>
      {preview === "" && (
        <JhButton
          variants="outline"
          onClick={handleChangeImg}
          className="w-fit"
        >
          <div className="flex items-center space-x-2">
            <PlusIcon className="w-7 h-7 text-primary" />
            <span>{"이미지 추가"}</span>
          </div>
        </JhButton>
      )}
      <JHInput
        ref={imgInputRef}
        variant="reset"
        id="iamge"
        type="file"
        accept="image/*"
        className="sr-only"
        multiple={false}
        onChange={handleFileChange}
      />
      {preview && (
        <div className="relative w-full aspect-video  ">
          <JhButton
            variants="reset"
            className="absolute inset-0 flex justify-center items-center z-10 bg-black/30 hover:bg-black/50 rounded-lg"
            onClick={handleDelete}
          >
            <div className="text-neutral-50 flex items-center space-x-2">
              <TrashIcon className="w-7 h-7" />
              <span>{"삭제하기"}</span>
            </div>
          </JhButton>
          <Image
            className="rounded-lg object-cover"
            fill
            alt="preview img"
            src={preview}
          />
        </div>
      )}
    </div>
  );
};
