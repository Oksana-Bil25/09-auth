"use client";

import { ReactNode, useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { User } from "@/types/user";

interface AuthProviderProps {
  children: ReactNode;
  initialUser?: User | null;
}

export default function AuthProvider({
  children,
  initialUser,
}: AuthProviderProps) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
  }, [initialUser, setUser]);

  return <>{children}</>;
}
