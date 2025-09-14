"use client";
import React, { useEffect, useState, type FormEvent } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteAppointment,
  getAppointments,
  insertAppointments,
  updateAppointment,
} from "../../../../../utils/Appointments";
import supabase from "@/app/supabase-client";
import AppointmentForm from "@/app/_components/Admin/AppointmentForm";
import { AppointmentType } from "../../../../../types/types";
import { toast } from "sonner";
import { userAuth } from "../../../../../context/Authcontext";

export default function Page() {
  const { setAppointments } = userAuth();
  const [nickname, setNickname] = useState<string>("");
  const [phone_number, setPhoneNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [cateredLoading, setCateredLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  //listener for query changes
  const queryClient = useQueryClient();

  //submit form
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    waiting_number: string
  ) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await insertAppointments(
        nickname,
        phone_number,
        waiting_number
      );

      if (error) {
        console.log("error adding appointment", error.message);
        toast.error("Error saving appointment", { position: "top-right" });
        return;
      }

      //send back data to user auth for appointment counter
      const { data: updatedAppointments } = await refetch();
      setAppointments(updatedAppointments ?? []);
      // notification
      toast.success("Successfully added appointment", {
        position: "top-right",
      });
    } catch (error) {
      console.error("error adding appointment", error);
      toast.error("Error saving appointment", { position: "top-right" });
    } finally {
      setNickname("");
      setPhoneNumber("");
      setLoading(false);
    }
  };

  const {
    data: appointments = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => getAppointments("client"),
  });

  //update status handler
  const changeStatus = async (id: string) => {
    try {
      setCateredLoading(true);
      const { error } = await updateAppointment(id);

      if (error) {
        console.error("error updating catered client: ", error.message);
        toast.error("Error updating appointment", { position: "top-right" });
        return;
      }

      const { data: updatedAppointments } = await refetch();
      setAppointments(updatedAppointments ?? []);

      toast.success("Successfully updated the appointment", {
        position: "top-right",
      });
    } catch (error) {
      console.error("error updating catered client: ", error);
      toast.error("Error updating appointment", { position: "top-right" });
    } finally {
      setCateredLoading(false);
    }
  };

  //delete appointment client
  const deleteAppointmentClient = async (id: string) => {
    try {
      setDeleteLoading(true);
      setDeleteId(id);
      const { error } = await deleteAppointment(id);
      queryClient.setQueryData(
        ["appointments"],
        (old: AppointmentType[] = []) => old.filter((item) => item.id !== id)
      );

      if (error) {
        console.error("error deleting appointment: ", error.message);
        toast.error("Error deleting appointment", { position: "top-right" });
      }

      toast.warning("Successfully deleted appointment", {
        position: "top-right",
      });
    } catch (error) {
      console.error("error deleting client: ", error);
      toast.error("Error deleting appointment", { position: "top-right" });
    } finally {
      setDeleteLoading(false);
      setDeleteId(null);
    }
  };

  //realtime changes
  useEffect(() => {
    const channel = supabase
      .channel("appointments-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Appointments" },
        () => {
          // force refetch whenever appointments change
          queryClient.invalidateQueries({ queryKey: ["appointments"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  if (isPending) {
    return <div>Loading ...</div>;
  }

  //for next number of appointment incrementing
  const nextWaitingNumber =
    appointments && appointments.length > 0
      ? parseInt(appointments[appointments.length - 1].waiting_number) + 1
      : 1;

  // filter only those without status
  const pendingAppointments = appointments.filter((item) => !item.status);

  return (
    <div>
      <h1> Appointment</h1>
      <p>
        Create and schedule new appointments by entering patient details,
        selecting the date and time, and specifying the reason for the visit
      </p>

      {/* form for appointment */}
      <AppointmentForm
        handleSubmit={handleSubmit}
        nextWaitingNumber={nextWaitingNumber.toString()}
        nickname={nickname}
        setNickname={setNickname}
        phone_number={phone_number}
        setPhoneNumber={setPhoneNumber}
        loading={loading}
      />

      <h2 className="mt-12 my-2">Current On Queue Clients</h2>
      <div className=" shadow-sm border rounded-lg overflow-x-auto h-[400px]">
        <table className="w-full table-auto text-sm text-center">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Nickname</th>
              <th className="py-3 px-6">Number</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {pendingAppointments.map((item, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{item.nickname}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.waiting_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {idx === 0 ? (
                    <button
                      disabled={cateredLoading}
                      onClick={() => changeStatus(item.id)}
                      className="px-5 py-3 text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                    >
                      {cateredLoading ? "Changing status..." : "Catered"}
                    </button>
                  ) : (
                    "Waiting..."
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* clients table */}
      <h2 className="mt-12 my-2">All Clients</h2>
      <div className=" shadow-sm border rounded-lg overflow-x-auto h-[400px]">
        <table className="w-full table-auto text-sm text-center">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Nickname</th>
              <th className="py-3 px-6">Number</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {appointments.map((item, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{item.nickname}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.waiting_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => deleteAppointmentClient(item.id)}
                    className="px-5 py-3 text-red-400 duration-150 bg-red-50 rounded-lg hover:bg-red-100 active:bg-red-200"
                  >
                    {deleteId === item.id && deleteLoading
                      ? "Deleting ..."
                      : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
