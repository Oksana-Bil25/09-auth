import { cookies } from "next/headers";
import axios from "axios";
import { User } from "@/types/user";
import { FetchNotesParams } from "./clientApi";

const serverInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
});

const getAuthHeaders = async () => {
  const cookieStore = await cookies();

  const allCookies = cookieStore.toString();

  return {
    Cookie: allCookies,
  };
};

// --- СЕРВЕРНІ ЗАПИТИ ---

export const getMeServer = async (): Promise<User | null> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await serverInstance.get<User>("/users/me", { headers });
    return data;
  } catch (error) {
    console.error("getMeServer Error:", error);
    return null;
  }
};

export const fetchNotesServer = async (params: FetchNotesParams) => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await serverInstance.get("/notes", {
      params,
      headers,
    });
    return data;
  } catch (error) {
    console.error("Server Fetch Notes Error:", error);
    return null;
  }
};

export const fetchNoteByIdServer = async (id: string) => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await serverInstance.get(`/notes/${id}`, { headers });
    return data;
  } catch (error) {
    console.error("fetchNoteByIdServer Error:", error);
    return null;
  }
};
