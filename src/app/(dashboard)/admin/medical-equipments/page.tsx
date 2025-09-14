"use client";
import React, { useRef, useState } from "react";

import {
  handleFileOnchange,
  handleImageUpload,
} from "@/app/_components/Admin/UploadFileImage";
import ImagePreview from "@/app/_components/Admin/ImagePreview";
import {
  handleDragOver,
  handleDropOver,
  removeImagePreview,
} from "@/app/_components/Admin/ImageUpload";
import FormError from "@/app/_components/Admin/FormError";
import FormButton from "@/app/_components/Admin/Formbutton";

export default function Page() {
  const [equipment, setEquipment] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [equipmentImage, setEquipmentImage] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const ImagePath = "equipment";
  const DataPath = "Medical Equipment";

  const resetForm = () => {
    if (fileRef.current) {
      fileRef.current.value = "";
    }
    setEquipment("");
    setDescription("");
    setPreviewImage("");
  };

  const formData = {
    equipment: equipment,
    description: description,
  };

  return (
    <div>
      <h1>Medical Equipment</h1>

      <form
        className="p-4 space-y-2 w-full md:w-[80%] xl:w-1/3"
        onSubmit={(e) =>
          handleImageUpload(
            e,
            setLoading,
            equipmentImage,
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
          setImage={setEquipmentImage}
          setPreviewImage={setPreviewImage}
          previewImage={previewImage}
          fileRef={fileRef}
          handleDropOver={(e) =>
            handleDropOver(e, setEquipmentImage, setPreviewImage)
          }
          removeImagePreview={() =>
            removeImagePreview(setEquipmentImage, setPreviewImage, fileRef)
          }
        />

        <input
          hidden
          id="fileInput"
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={(e) =>
            handleFileOnchange(e, setEquipmentImage, setPreviewImage)
          }
        />

        <div className=" flex flex-col space-y-2">
          <label htmlFor="equipment" className="text-gray-600">
            Equipment Name
          </label>
          <input
            id="equipment"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            placeholder="Enter your password"
            className="mt-2 w-full pr-12 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>

        <div className=" flex flex-col space-y-2">
          <label htmlFor="description" className="text-gray-600">
            Description
          </label>
          <div className="*:not-first:mt-2">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="write the equipment description"
              className="min-h-[200px] mt-2 w-full pr-4 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            ></textarea>
          </div>
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
