"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function UserDashboard() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/user/me").then(res => res.json()).then(data => {
      if(data.user) setUser(data.user);
    });
    fetch("/api/user/orders").then(res => res.json()).then(data => {
      if(data.data) setOrders(data.data);
    });
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.success("Logout Successful! Thank you for visiting the dashboard.");
    router.push("/login");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 pt-32 min-h-[70vh]">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 border-b border-sand pb-8 gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-forest">My Dashboard</h1>
          <p className="text-earth font-medium mt-2">Welcome back to your portal, <span className="font-bold text-primary">{user?.name || "Nature Supporter"}</span>.</p>
        </div>
        <button onClick={handleLogout} className="px-6 py-3 bg-white border border-sand hover:bg-red-50 hover:border-red-100 hover:text-red-500 rounded-xl font-bold text-forest transition-all shadow-sm flex items-center gap-2">
          <span>⏏</span> Secure Sign Out
        </button>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-serif font-bold text-forest flex items-center gap-3">
          <span className="bg-sand w-10 h-10 rounded-full flex items-center justify-center text-xl">📜</span> 
          My Validated Certificates
        </h2>
        
        <Link href="/marketplace" className="px-5 py-2.5 bg-forest text-white font-bold rounded-xl hover:bg-primary transition-all text-sm shadow-md">
          + Sponsor More Trees
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {orders.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white border border-sand rounded-[2rem] shadow-sm">
            <span className="text-5xl">🌱</span>
            <p className="font-bold text-forest text-2xl mt-5">No trees sponsored yet</p>
            <p className="text-earth font-medium mt-1 mb-6">Head over to the marketplace to cast your impact today.</p>
            <Link href="/marketplace" className="inline-block px-8 py-3.5 bg-gradient-to-r from-accent-dark via-accent to-accent-light text-white font-bold rounded-xl hover:shadow-lg transition-all shadow-md">
              Enter Marketplace
            </Link>
          </div>
        ) : (
          orders.map((o: any) => (
            <div key={o._id} className="bg-white p-7 rounded-3xl border border-sand shadow-lg shadow-forest/5 flex flex-col h-full relative overflow-hidden group hover:border-primary/30 transition-all">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary to-accent group-hover:w-2 transition-all"></div>
              
              <div className="flex justify-between items-start mb-5 pl-2">
                <div>
                   <span className="text-[10px] uppercase tracking-widest font-bold text-earth block mb-0.5">Order Code</span>
                   <span className="font-mono text-sm font-bold text-bark">{o.razorpayOrderId.slice(-8)}</span>
                </div>
                <span className={`px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full ${o.paymentStatus === 'Completed' ? 'bg-[#34d399]/10 text-forest' : 'bg-amber-100 text-amber-700'}`}>
                  {o.paymentStatus}
                </span>
              </div>
              
              <div className="flex-1 pl-2">
                <p className="text-[15px] font-bold text-forest mb-4 leading-relaxed">
                  {o.trees.map((t: any) => `${t.quantity}x ${t.name}`).join(' • ')}
                </p>
                <div className="my-5 pt-5 border-t border-sand">
                  <p className="text-[11px] text-earth uppercase font-bold tracking-widest mb-1.5">Contribution Total</p>
                  <p className="text-3xl font-black text-forest">₹{o.totalAmount}</p>
                </div>
              </div>

              <div className="mt-5 pl-2">
                {o.certificateValidated ? (
                  <>
                    {o.certificateId && (
                      <p className="text-[10px] text-earth uppercase font-bold tracking-widest mb-2 text-center">
                        Certificate ID: <span className="font-mono text-primary">{o.certificateId}</span>
                      </p>
                    )}
                    <button
                      onClick={() => window.open(`/certificate/${o._id}`, '_blank')}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-accent-dark via-accent to-accent-light text-white font-bold py-3.5 rounded-xl hover:shadow-xl hover:shadow-accent/20 hover:scale-[1.02] transition-all"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                      Download Digital Copy
                    </button>
                  </>
                ) : (
                  <div className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-sand/40 text-earth font-bold text-sm border border-sand">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    Awaiting Validation
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
