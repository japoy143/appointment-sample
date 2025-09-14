"use server";
import supabase from "@/app/supabase-client";
import { redirect } from "next/navigation";

//sign in user
export async function signInUser(
  prevState: { error?: string } | undefined,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  if (data.session) {
    redirect("/");
  }

  return { error: undefined };
}

//sign up user
export async function signUpUser(
  prevState: { error?: string } | undefined,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  if (data.session) {
    redirect("/");
  }

  return { error: undefined };
}
