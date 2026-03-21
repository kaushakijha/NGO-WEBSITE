"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface TreeInfoPopupProps {
  treeName: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TreeInfoPopup({ treeName, isOpen, onClose }: TreeInfoPopupProps) {
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !treeName) return;

    let isMounted = true;
    setLoading(true);
    setDescription("");
    setImageUrl(null);

    const fetchTreeInfo = async () => {
      try {
        let queryName = treeName.trim();
        console.log(queryName);
        let res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(queryName)}`);
        
        if (!res.ok) {
          queryName = treeName.replace(/Tree/ig, "").trim();
          console.log("Retrying with:", queryName);
          res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(queryName)}`);
          if (!res.ok) throw new Error("Not found");
        }
        
        const data = await res.json();
        
        if (isMounted) {
          if (data.type === "disambiguation" || !data.extract) {
             throw new Error("Disambiguation or empty");
          }
          setDescription(data.extract);
          if (data.thumbnail?.source) {
            setImageUrl(data.thumbnail.source);
          }
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setDescription(`The ${treeName} is an incredible species that contributes significantly to our environment. Trees like this are vital to our ecosystem, providing essential oxygen, improving local air quality, stabilizing soil, and supporting diverse wildlife. Planting a ${treeName} successfully helps restore nature's balance.`);
          setLoading(false);
        }
      }
    };

    fetchTreeInfo();

    return () => { isMounted = false; };
  }, [treeName, isOpen]);

  if (!isOpen || !treeName) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Popup / Modal */}
      <div className="relative z-10 w-full max-w-md bg-[#1c1c1c] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl transform scale-100 transition-all duration-300">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors size-8 flex items-center justify-center rounded-full hover:bg-white/10"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="flex flex-col items-center text-center gap-5 mt-2">
          {imageUrl ? (
            <div className="size-24 rounded-full overflow-hidden border-4 border-[#34d399] shadow-lg">
              <img src={imageUrl} alt={treeName} className="w-full h-full object-cover bg-white" />
            </div>
          ) : (
            <div className="size-24 rounded-full bg-[#34d399] flex items-center justify-center text-4xl shadow-lg border-4 border-white/5">
              🌳
            </div>
          )}

          <div className="w-full">
            <h3 className="text-2xl font-bold font-serif text-white/90 mb-3">{treeName}</h3>
            
            {loading ? (
              <div className="space-y-3 animate-pulse mt-4">
                <div className="h-3 bg-white/10 rounded w-full"></div>
                <div className="h-3 bg-white/10 rounded w-5/6 mx-auto"></div>
                <div className="h-3 bg-white/10 rounded w-4/6 mx-auto"></div>
              </div>
            ) : (
              <p className="text-[#a0a0a0] text-sm leading-relaxed max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                {description}
              </p>
            )}
          </div>

          <div className="w-full mt-4 flex flex-col gap-3">
            <Link 
              href={`/marketplace?tree=${encodeURIComponent(treeName)}`}
              className="w-full h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-accent-dark via-accent to-accent-light text-white text-[15px] font-bold hover:shadow-xl hover:shadow-accent/20 transition-all hover:scale-105 active:scale-95"
              onClick={onClose}
            >
              🌿 Plant a Tree
            </Link>
            <button 
              onClick={onClose}
              className="w-full h-11 flex items-center justify-center rounded-full border border-white/10 text-white/70 text-[15px] font-semibold hover:bg-white/5 hover:text-white transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
