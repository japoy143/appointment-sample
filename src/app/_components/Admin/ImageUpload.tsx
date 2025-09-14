export const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
  e.preventDefault();
  e.stopPropagation();

  console.log("drag event");
};

export const handleDropOver = (
  e: React.DragEvent<HTMLLabelElement>,
  setImage: (value: React.SetStateAction<File | null>) => void,
  setPreviewImage: (value: string | null) => void
) => {
  e.preventDefault();
  handleImage(e.dataTransfer.files, setImage, setPreviewImage);
  console.log(e.dataTransfer.files);
};

export const handleImage = (
  files: FileList,
  setImage: (value: React.SetStateAction<File | null>) => void,
  setPreviewImage: (value: string | null) => void
) => {
  if (!files) return;
  const file = files[0];
  setImage(file);
  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onload = () => {
    if (typeof reader.result === "string") {
      setPreviewImage(reader.result);
    }
  };
};

export const removeImagePreview = (
  setImage: (value: React.SetStateAction<File | null>) => void,
  setPreviewImage: (value: string | null) => void,
  fileRef: React.RefObject<HTMLInputElement | null>
) => {
  setPreviewImage("");
  setImage(null);
  if (fileRef.current) {
    fileRef.current.value = "";
  }
};
