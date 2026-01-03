"use client";

import { useEffect, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { checkSession } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { usePathname, useRouter } from "next/navigation";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  const pathname = usePathname();
  const router = useRouter();

  const isPrivateRoute =
    pathname.startsWith("/notes") || pathname.startsWith("/profile");

  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ["current-user"],
    queryFn: checkSession,
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
    }

    if (isError) {
      clearIsAuthenticated();

      if (isPrivateRoute) {
        router.push("/sign-in");
      }
    }
  }, [
    isSuccess,
    isError,
    data,
    setUser,
    clearIsAuthenticated,
    isPrivateRoute,
    router,
  ]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>Loading session...</p>
      </div>
    );
  }

  if (isPrivateRoute && isError) {
    return null;
  }

  return <>{children}</>;
}
