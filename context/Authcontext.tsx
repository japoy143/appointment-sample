"use client";
import supabase from "@/app/supabase-client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getAppointments } from "../utils/Appointments";
import { AppointmentType } from "../types/types";
import { useRouter } from "next/navigation";

// Define the shape of your context value
interface AuthContextType {
  session: any;
  appointments: AppointmentType[] | [];
  setAppointments: (value: [] | AppointmentType[]) => void;
  setSession: (session: any) => void;

  signInUser: (
    prevState:
      | {
          error?: string;
        }
      | undefined,
    formData: FormData
  ) => Promise<
    | {
        error: string;
      }
    | {
        error: undefined;
      }
  >;

  signUpUser: (
    prevState:
      | {
          error?: string;
        }
      | undefined,
    formData: FormData
  ) => Promise<
    | {
        error: string;
      }
    | {
        error: undefined;
      }
    | undefined
  >;
  signOutUser: () => void;
}

// Create context with proper typing
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Type the children prop
interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const router = useRouter();
  const [session, setSession] = useState<unknown>(undefined);
  const [appointments, setAppointments] = useState<AppointmentType[] | []>([]);

  //sign in user
  const signInUser = async (
    prevState: { error?: string } | undefined,
    formData: FormData
  ) => {
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
      router.push("/admin/dashboard");
    }

    return { error: undefined };
  };

  //sign up user
  const signUpUser = async (
    prevState: { error?: string } | undefined,
    formData: FormData
  ) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    return { error: undefined };
  };

  //Sign Out
  const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("there was an error: ", error);
    } else {
      router.push("/sign-in");
    }
  };

  //listen for changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    const fetchAppointments = async () => {
      const appointments = await getAppointments("client");
      setAppointments(appointments ?? []);
    };

    fetchAppointments();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        appointments,
        setAppointments,
        setSession,
        signInUser,
        signUpUser,
        signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const userAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
