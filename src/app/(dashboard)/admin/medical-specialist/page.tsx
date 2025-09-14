"use client";
import React, { useRef, useState } from "react";
import {
  handleFileOnchange,
  handleImageUpload,
} from "@/app/_components/Admin/UploadFileImage";
import {
  handleDragOver,
  handleDropOver,
  removeImagePreview,
} from "@/app/_components/Admin/ImageUpload";
import ImagePreview from "@/app/_components/Admin/ImagePreview";
import FormButton from "@/app/_components/Admin/Formbutton";
import FormError from "@/app/_components/Admin/FormError";

export default function Page() {
  const [specialization, setSpecialization] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [specialistImage, setSpecialistImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const ImagePath = "specialization";
  const DataPath = "Medical Specialization";

  const resetForm = () => {
    if (fileRef.current) {
      fileRef.current.value = "";
    }
    setSpecialization("");
    setPreviewImage("");
  };

  const formData = {
    specialization: specialization,
  };

  return (
    <div>
      <h1>Medical Specialist</h1>

      <form
        className="p-4 space-y-2 w-full md:w-[80%] xl:w-1/3"
        onSubmit={(e) =>
          handleImageUpload(
            e,
            setLoading,
            specialistImage,
            ImagePath,
            DataPath,
            resetForm,
            setError,
            formData
          )
        }
      >
        {/* TODO: must have a image drag and drop input */}
        <ImagePreview
          handleDragOver={handleDragOver}
          setImage={setSpecialistImage}
          setPreviewImage={setPreviewImage}
          previewImage={previewImage}
          fileRef={fileRef}
          handleDropOver={(e) =>
            handleDropOver(e, setSpecialistImage, setPreviewImage)
          }
          removeImagePreview={() =>
            removeImagePreview(setSpecialistImage, setPreviewImage, fileRef)
          }
        />

        <input
          hidden
          id="fileInput"
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={(e) =>
            handleFileOnchange(e, setSpecialistImage, setPreviewImage)
          }
        />
        <div className=" flex flex-col space-y-2">
          <label className="text-gray-600">Specialization Name</label>
          <input
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            placeholder="Enter your password"
            className="mt-2 w-full pr-12 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>

        <div className=" flex justify-end">
          <FormButton
            loading={loading}
            buttonName="save"
            buttonLoading="saving..."
          />
        </div>
      </form>
      <FormError error={error} />
    </div>
  );
}
