"use client";
import React, { useRef, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  handleDragOver,
  handleDropOver,
  removeImagePreview,
} from "@/app/_components/Admin/ImageUpload";
import ImagePreview from "@/app/_components/Admin/ImagePreview";
import FormButton from "@/app/_components/Admin/Formbutton";
import FormError from "@/app/_components/Admin/FormError";
import {
  handleImageUpload,
  handleFileOnchange,
} from "@/app/_components/Admin/UploadFileImage";

export default function Page() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [articleImage, setArticleImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const ImagePath = "articles";
  const DataPath = "Articles";

  //resetting all values of form
  const resetForm = () => {
    if (fileRef.current) {
      fileRef.current.value = "";
    }
    setArticleImage(null);
    setTitle("");
    setDescription("");
    setDate(undefined);
    setLoading(false);
    setPreviewImage("");
  };

  //format date to string
  const formattedDate = date
    ? date.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No date selected";

  // for object form submission
  const formData = {
    title: title,
    description: description,
    date: formattedDate,
  };

  return (
    <div>
      <h1>Articles</h1>

      <form
        className="p-4 space-y-2 w-full md:w-[80%] xl:w-1/3"
        onSubmit={(e) =>
          handleImageUpload(
            e,
            setLoading,
            articleImage,
            ImagePath,
            DataPath,
            resetForm,
            setError,
            formData
          )
        }
      >
        {/* TODO: must have a image drag and drop input */}
        <label>Article Image</label>
        <ImagePreview
          handleDragOver={handleDragOver}
          setImage={setArticleImage}
          setPreviewImage={setPreviewImage}
          previewImage={previewImage}
          fileRef={fileRef}
          handleDropOver={(e) =>
            handleDropOver(e, setArticleImage, setPreviewImage)
          }
          removeImagePreview={() =>
            removeImagePreview(setArticleImage, setPreviewImage, fileRef)
          }
        />

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={(e) =>
            handleFileOnchange(e, setArticleImage, setPreviewImage)
          }
          className="hidden"
          id="fileInput"
        />

        <div className=" flex flex-col space-y-2">
          <label htmlFor="title" className="text-gray-600">
            Title
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
              className="min-h-[100px] mt-2 w-full pr-4 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            ></textarea>
          </div>
        </div>

        <div className=" flex flex-col space-y-2">
          <label>Date</label>
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border p-2"
            />
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
