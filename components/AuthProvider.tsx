"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

interface UserData {
  name: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  refresh: () => void;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, refresh: () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch("/api/user/me");
      if (!res.ok) { setUser(null); setLoading(false); return; }
      const data = await res.json();
      setUser(data?.user || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const refresh = useCallback(() => {
    setLoading(true);
    fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider value={{ user, loading, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
