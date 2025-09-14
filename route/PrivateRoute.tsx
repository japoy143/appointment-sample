"use client";
import { type PropsWithChildren } from "react";
import { userAuth } from "../context/Authcontext";
import { redirect } from "next/navigation";

type PrivateRoutePropsType = PropsWithChildren;
const PrivateRoute = ({ children }: PrivateRoutePropsType) => {
  const { session } = userAuth();

  if (session === undefined) {
    return <p>Loading ...</p>;
  }

  return <>{session ? <>{children} </> : redirect("/")}</>;
};

export default PrivateRoute;
