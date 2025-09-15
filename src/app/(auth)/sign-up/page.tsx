"use client";
import React from "react";
import Link from "next/link";
import AuthForm from "@/app/_components/Auth/AuthForm";
import Image from "next/image";

export default function Page() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-5">
        <div className="text-center pb-8">
          <Image
            alt="logo"
            src="https://floatui.com/logo.svg"
            width={150}
            height={150}
            className="mx-auto"
          />
          <div className="mt-5">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Sign up to your account
            </h3>
          </div>
        </div>
        <AuthForm isSignUp="signup" />
        <p className="text-center">
          Already have an account?{" "}
          <Link
            className="font-medium text-indigo-600 hover:text-indigo-500"
            href={"/auth/sign-in"}
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
