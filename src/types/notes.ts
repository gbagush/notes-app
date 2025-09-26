export type ApiStatus = "success" | "fail" | "error";

export interface ApiResponse<T = unknown> {
  status: ApiStatus;
  message: string;
  data: T;
}

export interface AuthToken {
  accessToken: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Note {
  id: string;
  title: string;
  body: string;
  owner: string;
  archived: boolean;
  createdAt: string;
}
