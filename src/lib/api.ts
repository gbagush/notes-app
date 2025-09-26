import type { ApiResponse, AuthToken, Note, User } from "@/types/notes";

const BASE_URL = "https://notes-api.dicoding.dev/v1" as const;

const getAccessToken = () => localStorage.getItem("accessToken");

const putAccessToken = (accessToken: string) => {
  localStorage.setItem("accessToken", accessToken);
};

type FetchOpts = Omit<RequestInit, "headers"> & { headers?: HeadersInit };

const fetchWithToken = (url: string, options: FetchOpts = {}) => {
  const token = getAccessToken();
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token ?? ""}`,
    },
  });
};

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const json: ApiResponse<AuthToken> = await res.json();

  if (json.status !== "success") {
    return { error: true, data: null };
  }
  return { error: false, data: json.data };
};

const register = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const json: ApiResponse = await res.json();

  if (json.status !== "success") {
    return { error: true };
  }
  return { error: false };
};

const getUserLogged = async () => {
  const res = await fetchWithToken(`${BASE_URL}/users/me`);
  const json: ApiResponse<User> = await res.json();

  if (json.status !== "success") {
    return { error: true, data: null };
  }
  return { error: false, data: json.data };
};

const addNote = async ({ title, body }: { title: string; body: string }) => {
  const res = await fetchWithToken(`${BASE_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body }),
  });

  const json: ApiResponse<Note> = await res.json();

  if (json.status !== "success") {
    return { error: true, data: null };
  }
  return { error: false, data: json.data };
};

const getActiveNotes = async () => {
  const res = await fetchWithToken(`${BASE_URL}/notes`);
  const json: ApiResponse<Note[]> = await res.json();

  if (json.status !== "success") {
    return { error: true, data: null };
  }
  return { error: false, data: json.data };
};

const getArchivedNotes = async () => {
  const res = await fetchWithToken(`${BASE_URL}/notes/archived`);
  const json: ApiResponse<Note[]> = await res.json();

  if (json.status !== "success") {
    return { error: true, data: null };
  }
  return { error: false, data: json.data };
};

const getNote = async (id: string) => {
  const res = await fetchWithToken(`${BASE_URL}/notes/${id}`);
  const json: ApiResponse<Note> = await res.json();

  if (json.status !== "success") {
    return { error: true, data: null };
  }
  return { error: false, data: json.data };
};

const archiveNote = async (id: string) => {
  const res = await fetchWithToken(`${BASE_URL}/notes/${id}/archive`, {
    method: "POST",
  });
  const json: ApiResponse = await res.json();

  if (json.status !== "success") {
    return { error: true, data: null };
  }
  return { error: false, data: json.data };
};

const unarchiveNote = async (id: string) => {
  const res = await fetchWithToken(`${BASE_URL}/notes/${id}/unarchive`, {
    method: "POST",
  });
  const json: ApiResponse = await res.json();

  if (json.status !== "success") {
    return { error: true, data: null };
  }
  return { error: false, data: json.data };
};

const deleteNote = async (id: string) => {
  const res = await fetchWithToken(`${BASE_URL}/notes/${id}`, {
    method: "DELETE",
  });
  const json: ApiResponse = await res.json();

  if (json.status !== "success") {
    return { error: true, data: null };
  }
  return { error: false, data: json.data };
};

export {
  getAccessToken,
  putAccessToken,
  login,
  register,
  getUserLogged,
  addNote,
  getActiveNotes,
  getArchivedNotes,
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
};
