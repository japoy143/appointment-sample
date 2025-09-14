"use client";
import React from "react";

export default function FormButton({
  loading,
  buttonName,
  buttonLoading,
}: {
  loading: boolean;
  buttonName: string;
  buttonLoading: string;
}) {
  return (
    <button
      disabled={loading}
      className="px-5 py-3 text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
    >
      {loading ? buttonLoading : buttonName}
    </button>
  );
}
