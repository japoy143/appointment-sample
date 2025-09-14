"use client";
import React from "react";
import UploadIcon from "../../../../public/Icons/UploadIcon";
import ImageIcon from "../../../../public/Icons/ImageIcon";
import CloseIcon from "../../../../public/Icons/CloseIcon";

interface ImagePreviewType {
  handleDragOver: (e: React.DragEvent<HTMLLabelElement>) => void;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  setPreviewImage: React.Dispatch<string | null>;
  previewImage: string | null;
  fileRef: React.RefObject<HTMLInputElement | null>;

  handleDropOver: (
    e: React.DragEvent<HTMLLabelElement>,
    setImage: (value: React.SetStateAction<File | null>) => void,
    setPreviewImage: (value: string | null) => void
  ) => void;

  removeImagePreview: (
    setImage: (value: React.SetStateAction<File | null>) => void,
    setPreviewImage: (value: string | null) => void,
    fileRef: React.RefObject<HTMLInputElement | null>
  ) => void;
}

export default function ImagePreview({
  handleDragOver,
  handleDropOver,
  setImage,
  setPreviewImage,
  previewImage,
  fileRef,
  removeImagePreview,
}: ImagePreviewType) {
  return (
    <div className=" relative w-full h-[200px]">
      <label
        onDragOver={handleDragOver}
        onDrop={(e) => handleDropOver(e, setImage, setPreviewImage)}
        htmlFor="fileInput"
        className="group p-1 w-full h-full  flex flex-col items-center justify-center rounded border border-gray-400 hover:border-blue-400 border-dashed cursor-pointer"
      >
        {previewImage ? (
          <div className="w-full h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewImage}
              alt="previewImage"
              className=" w-full h-full object-cover"
            />
          </div>
        ) : (
          <>
            <div className=" border-gray-400 border p-2 rounded-full">
              <ImageIcon className=" size-4" />
            </div>
            <div className=" flex  flex-col items-center justify-center space-y-2">
              <p>Drop your image here</p>
              <p className=" text-xs opacity-40">
                SVG, PNG, JPG or GIF (max. 2MB)
              </p>
              <div className=" group-hover:border-blue-400 flex gap-2 items-center p-2 border rounded border-gray-400  text-gray-400">
                <UploadIcon classname=" group-hover:text-blue-400 size-4 " />
                <p className="group-hover:text-blue-400 text-sm">
                  Select Image
                </p>
              </div>
            </div>
          </>
        )}
      </label>

      {previewImage && (
        <div
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => removeImagePreview(setImage, setPreviewImage, fileRef)}
          className=" p-1  absolute top-2 right-2 shadow-2xl cursor-pointer"
        >
          <CloseIcon className=" size-4  text-gray-300" />
        </div>
      )}
    </div>
  );
}
