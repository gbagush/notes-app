import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "@/types/notes";
import {
  login as apiLogin,
  register as apiRegister,
  getUserLogged,
  putAccessToken,
} from "@/lib/api";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (p: { email: string; password: string }) => Promise<boolean>;
  register: (p: {
    name: string;
    email: string;
    password: string;
  }) => Promise<boolean>;
  logout: () => void;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const me = await getUserLogged();
        if (!me.error && me.data) setUser(me.data);
      } finally {
        setLoading(false);
      }
    };
    bootstrap();
  }, []);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const res = await apiLogin({ email, password });
    if (res.error || !res.data) return false;

    putAccessToken(res.data.accessToken);
    const me = await getUserLogged();
    if (!me.error && me.data) {
      setUser(me.data);
      return true;
    }
    return false;
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
    const res = await apiRegister({ name, email, password });
    return !res.error;
  };

  const logout = () => {
    try {
      localStorage.removeItem("accessToken");
    } catch {}
    setUser(null);
  };

  const refresh = async () => {
    const me = await getUserLogged();
    if (!me.error) setUser(me.data);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
