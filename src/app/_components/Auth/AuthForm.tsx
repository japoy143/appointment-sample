"use client";

import SubmitButton from "@/app/_components/Auth/SubmitButton";

import { useActionState } from "react";
import { userAuth } from "../../../../context/Authcontext";

export default function AuthForm({
  isSignUp = "signup",
}: {
  isSignUp: "signup" | "signin";
}) {
  const { signInUser, signUpUser } = userAuth();
  console.log(isSignUp);
  const action = isSignUp === "signup" ? signUpUser : signInUser;
  const [state, formAction] = useActionState(action, { error: undefined });

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label className="font-medium">Email</label>
        <input
          type="email"
          name="email"
          required
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
        />
      </div>
      <div>
        <label className="font-medium">Password</label>
        <input
          type="password"
          name="password"
          required
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
        />
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-x-3">
          <input
            type="checkbox"
            id="remember-me-checkbox"
            className="checkbox-item peer hidden"
          />
          <label
            htmlFor="remember-me-checkbox"
            className="relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
          ></label>
          <span>Remember me</span>
        </div>
        <a
          href="javascript:void(0)"
          className="text-center text-indigo-600 hover:text-indigo-500"
        >
          Forgot password?
        </a>
      </div>
      {state?.error && <p className="text-red-600 text-sm">{state.error}</p>}
      {isSignUp === "signup" ? (
        <SubmitButton buttonStatus="Signing up..." buttonName="Sign Up" />
      ) : (
        <SubmitButton buttonStatus="Signing in..." buttonName="Sign In" />
      )}
    </form>
  );
}
