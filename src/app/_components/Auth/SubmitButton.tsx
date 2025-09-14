// components/SubmitButton.tsx
"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({
  buttonStatus = "",
  buttonName = "",
}: {
  buttonStatus: string;
  buttonName: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 disabled:opacity-50"
    >
      {pending ? buttonStatus : buttonName}
    </button>
  );
}
