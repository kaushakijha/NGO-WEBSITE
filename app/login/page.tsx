"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        toast.error(data.error || "Login failed");
        setError(data.error || "Login failed");
        return;
      }
      
      toast.success("Login Successful! Welcome back from all of us.");
      
      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
      router.refresh();
    } catch (err) {
      toast.error("An unexpected error occurred. Please check network connection.");
      setError("An unexpected error occurred. Please check network connection.");
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-cream min-h-[70vh]">
      <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-xl shadow-forest/5 border border-sand">
        <h1 className="text-3xl font-serif font-bold text-forest mb-6 text-center">Welcome Back</h1>
        
        {error && <div className="bg-red-50 text-red-500 font-medium p-3 rounded-xl text-sm mb-5 text-center">{error}</div>}
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-semibold text-earth mb-1.5 block">Email Address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-xl bg-[#fdfdfc] border border-sand px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all font-medium text-forest" 
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-earth mb-1.5 block">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full rounded-xl bg-[#fdfdfc] border border-sand px-4 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all font-medium text-forest" 
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="mt-4 w-full font-bold py-3.5 rounded-xl bg-forest text-white hover:bg-gradient-to-r hover:from-primary hover:to-primary-light transition-all shadow-md">
            Sign In to Dashboard
          </button>
        </form>
        
        <p className="text-sm text-center text-earth mt-8 font-medium">
          Don&apos;t have an account? <Link href="/register" className="text-primary font-bold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
