import React, { type FormEvent } from "react";

interface AppointmentFormType {
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    waiting_number: string
  ) => Promise<void>;
  nextWaitingNumber: string;
  nickname: string;
  setNickname: (value: React.SetStateAction<string>) => void;
  phone_number: string;
  setPhoneNumber: (value: React.SetStateAction<string>) => void;
  loading: boolean;
}

export default function AppointmentForm({
  handleSubmit,
  nextWaitingNumber,
  nickname,
  setNickname,
  phone_number,
  setPhoneNumber,
  loading,
}: AppointmentFormType) {
  return (
    <form
      onSubmit={(e) => handleSubmit(e, nextWaitingNumber)}
      className="p-4 space-y-2 w-full lg:w-1/2 xl:1/3"
    >
      <label className="text-gray-600">NickName</label>
      <input
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="Enter your password"
        className="mt-2 w-full pr-12 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
      />

      <div className=" ">
        <label className="text-gray-600">Phone number</label>
        <div className=" relative mt-2  text-gray-500">
          <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
            <option>PH</option>
          </div>
          <input
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="number"
            placeholder=" 0904 000-000"
            className="w-full pl-[4.5rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
      </div>

      <div>
        <label className="text-gray-600">Waiting Number</label>
        <div className="relative mt-2  text-gray-500">
          <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
            <option>Num</option>
          </div>
          <div className="w-full pl-[4.5rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg">
            <p>{nextWaitingNumber}</p>
          </div>
        </div>
      </div>

      <div className=" flex   justify-end py-4">
        <button
          disabled={loading}
          type="submit"
          className="px-5 py-3 text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
        >
          {loading ? "Loading ..." : "Save"}
        </button>
      </div>
    </form>
  );
}
