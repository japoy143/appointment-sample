"use client";

import FormButton from "@/app/_components/Admin/Formbutton";
import FormError from "@/app/_components/Admin/FormError";
import supabase from "@/app/supabase-client";
import { Calendar } from "@/components/ui/calendar";
import React, { useState, type FormEvent } from "react";

export default function Page() {
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  //format date to string
  const formattedDate = date
    ? date.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No date selected";

  //add news
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.from("News").insert({
        news_title: title,
        news_date: formattedDate,
      });

      if (error) {
        console.log("error occurred on saving news: ", error);
        setError(error.message);
      }
    } catch (error) {
      console.error("error occurred on saving news: ", error);
    } finally {
      setTitle("");
      setDate(undefined);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1> News</h1>

      <form
        className="p-4 space-y-2 w-full md:w-[80%] xl:w-1/3"
        onSubmit={handleSubmit}
      >
        {/* news title */}
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

        <div className=" flex  justify-end">
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
