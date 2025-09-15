"use client";
import { PropsWithChildren, useEffect } from "react";
import { userAuth } from "../context/Authcontext";
import { useRouter } from "next/navigation";

type PrivateRoutePropsType = PropsWithChildren;

const PrivateRoute = ({ children }: PrivateRoutePropsType) => {
  const { session } = userAuth();
  const router = useRouter();

  useEffect(() => {
    if (session === null) {
      router.push("/sign-in");
    }
  }, [session, router]);

  if (session === undefined) {
    return <p>Loading ...</p>;
  }

  // only render children if session exists
  return <>{session ? children : null}</>;
};

export default PrivateRoute;
