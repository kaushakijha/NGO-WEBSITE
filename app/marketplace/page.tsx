"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TreeInfoPopup from "../../components/TreeInfoPopup";
import { useCart } from "../../components/CartProvider";

interface Tree {
  id: string | number;
  name: string;
  price: number;
  type: string;
  img: string;
}

export default function Marketplace() {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>(["Fruit Bearing", "Medicinal", "Shade Giving"]);
  const [sortBy, setSortBy] = useState("recommended");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedTree, setSelectedTree] = useState<string | null>(null);
  const [addedId, setAddedId] = useState<string | number | null>(null);
  const { addToCart } = useCart();

  const handleAddToCart = (tree: Tree) => {
    const qty = quantities[tree.id] || 1;
    // Map backend response 'price' directly adjusting to the 12-month value the front-end has been charging
    addToCart({ id: tree.id, name: tree.name, img: tree.img, price: tree.price * 12 }, qty);
    setAddedId(tree.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  useEffect(() => {
    async function fetchTrees() {
      try {
        const res = await fetch("/api/trees");
        const data = await res.json();
        
        const enhancedData = await Promise.all(data.map(async (t: Tree) => {
          try {
            let q = t.name.trim();
            let wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q)}`);
            if (!wikiRes.ok) {
              q = t.name.replace(/Tree/ig, "").trim();
              wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q)}`);
            }
            if (wikiRes.ok) {
              const wikiData = await wikiRes.json();
              if (wikiData.thumbnail?.source) {
                return { ...t, img: wikiData.thumbnail.source };
              }
            }
            return t;
          } catch(e) {
            return t;
          }
        }));

        setTrees(enhancedData);
      } catch (error) {
        console.error("Failed to load trees", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTrees();
  }, []);

  const toggleFilter = (f: string) =>
    setActiveFilters((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);

  const filteredTrees = trees
    .filter((t) => activeFilters.includes(t.type))
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });

  const updateQty = (id: string | number, delta: number) =>
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) + delta) }));

  const handleAdd = (id: string | number) => {
    setAddedId(id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col max-w-[1440px] mx-auto w-full">
      {/* Hero */}
      <section className="p-5 md:p-8">
        <div className="relative overflow-hidden rounded-3xl min-h-[320px] flex items-center shadow-2xl shadow-forest/15 group">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/60 to-transparent z-10"></div>
            <img alt="Planting" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&w=1200&q=80" />
          </div>
          <div className="relative z-20 flex flex-col justify-center max-w-2xl px-8 md:px-14 py-12">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-accent backdrop-blur-md border border-accent/20 mb-5">
              🌳 4ft Tree + 3 Years Care + GeoTag
            </span>
            <h1 className="heading-serif text-white text-3xl md:text-5xl font-black leading-tight mb-4">
              Gift a tree for<br/>every special moment
            </h1>
            <p className="text-white/60 text-base mb-6 max-w-lg leading-relaxed">
              Celebrate birthdays, memorials, and anniversaries with a living legacy. Starting at ₹299 with digital certificate.
            </p>
            <div className="flex flex-wrap gap-3">
              {["4.5★ Rating", "1.2M+ Trees", "GPS Tracking", "3-Year Care"].map((tag) => (
                <span key={tag} className="text-[11px] font-bold text-white/60 bg-white/8 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/8">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Occasion Quick-Picks */}
      <section className="px-5 md:px-8">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4">
          {[
            { emoji: "🎂", label: "Birthday" },
            { emoji: "💐", label: "For Mother" },
            { emoji: "🎁", label: "Gift" },
            { emoji: "🕯️", label: "Memorial" },
            { emoji: "👩", label: "Women's Day" },
            { emoji: "💍", label: "Anniversary" },
            { emoji: "🎓", label: "Graduation" },
            { emoji: "👶", label: "New Baby" },
          ].map((occ, i) => (
            <button key={i} className="flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-full bg-surface border border-sand hover:border-accent/30 hover:shadow-md transition-all duration-200 group">
              <span className="text-lg group-hover:scale-110 transition-transform">{occ.emoji}</span>
              <span className="text-[13px] font-semibold text-forest whitespace-nowrap">{occ.label}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-8 px-5 md:px-8 pb-12 mt-4">
        {/* Sidebar */}
        <aside className="w-full lg:w-72 flex-shrink-0 space-y-5">
          <div className="bg-surface rounded-2xl p-6 border border-sand shadow-sm">
            <h3 className="font-bold text-forest mb-4 flex items-center gap-2 text-sm">
              🔍 Filter by Type
            </h3>
            <div className="space-y-3">
              {["Fruit Bearing", "Medicinal", "Shade Giving"].map((filter) => (
                <label key={filter} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="rounded border-sage text-primary focus:ring-primary/30 w-4 h-4 accent-primary"
                    checked={activeFilters.includes(filter)}
                    onChange={() => toggleFilter(filter)}
                  />
                  <span className="text-sm text-bark/70 group-hover:text-primary transition-colors font-medium">{filter}</span>
                  <span className="ml-auto text-[11px] text-earth bg-cream rounded-full px-2 py-0.5 font-semibold">
                    {trees.filter((t) => t.type === filter).length}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/5 via-cream to-accent/5 rounded-2xl p-6 border border-primary/8">
            <h3 className="font-bold text-forest mb-4 text-sm">🎁 What You Get</h3>
            <ul className="space-y-2.5 text-sm text-earth">
              {[
                "4ft tree planted in your name",
                "3 years of care & maintenance",
                "GPS coordinates & geo-tagged photos",
                "Personalized digital certificate",
                "Periodic growth photo updates",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary mt-0.5 text-xs">●</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Tree Grid */}
        <section className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="heading-serif text-2xl font-bold text-forest">Choose a Tree</h2>
              <p className="text-sm text-earth mt-1">{filteredTrees.length} trees available</p>
            </div>
            <select
              className="bg-surface border border-sand text-sm font-medium text-forest rounded-xl py-2 pl-4 pr-8 cursor-pointer hover:border-primary/30 transition-colors focus:ring-1 focus:ring-primary/30 focus:border-primary focus:outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
            </select>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-surface rounded-2xl border border-sand overflow-hidden">
                  <div className="h-48 bg-sand anim-shimmer"></div>
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-cream-dark rounded w-3/4"></div>
                    <div className="h-4 bg-cream rounded w-1/2"></div>
                    <div className="h-11 bg-cream-dark rounded-xl"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredTrees.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-earth">
              <span className="text-5xl mb-4">🔎</span>
              <p className="font-bold text-lg text-forest">No trees match your filters</p>
              <p className="text-sm">Try adjusting the filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTrees.map((tree) => (
                <div key={tree.id} className="group bg-surface rounded-2xl border border-sand overflow-hidden hover:shadow-xl hover:shadow-forest/5 hover:border-primary/15 transition-all duration-300 flex flex-col hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <img src={tree.img} alt={tree.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className="text-[11px] font-bold bg-surface/90 backdrop-blur-sm text-forest px-3 py-1 rounded-full border border-sand">
                        {tree.type === "Fruit Bearing" ? "🍎" : tree.type === "Medicinal" ? "🌿" : "🌳"} {tree.type}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="text-[11px] font-bold bg-accent text-white px-3 py-1 rounded-full shadow-md">
                        ₹{tree.price * 12}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-lg text-forest mb-0.5">{tree.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-accent text-sm">★★★★★</span>
                      <span className="text-[11px] text-earth">(4.5)</span>
                    </div>
                    <p className="text-xs text-earth mb-4">🌳 4ft Tree + 3 Years Care + GeoTag</p>

                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-semibold text-earth">Qty:</span>
                      <div className="flex items-center border border-sand rounded-lg overflow-hidden">
                        <button className="px-3 py-1.5 text-sm hover:bg-cream transition-colors text-earth" onClick={() => updateQty(tree.id, -1)}>−</button>
                        <span className="px-3 py-1.5 text-sm font-bold border-x border-sand min-w-[40px] text-center text-forest">{quantities[tree.id] || 1}</span>
                        <button className="px-3 py-1.5 text-sm hover:bg-cream transition-colors text-earth" onClick={() => updateQty(tree.id, 1)}>+</button>
                      </div>
                      <span className="ml-auto font-black text-lg text-forest">
                        ₹{(tree.price * 12) * (quantities[tree.id] || 1)}
                      </span>
                    </div>

                    <div className="mt-auto flex flex-col gap-2">
                      <button
                        onClick={() => handleAddToCart(tree)}
                        disabled={addedId === tree.id}
                        className={`w-full font-bold py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                          addedId === tree.id
                            ? "bg-primary text-white scale-[0.98] cursor-not-allowed"
                            : "bg-forest text-white hover:bg-gradient-to-r hover:from-accent-dark hover:via-accent hover:to-accent-light shadow-md"
                        }`}
                      >
                        {addedId === tree.id 
                          ? "✓ Added to Cart"
                          : "🌿 Add to Cart"}
                      </button>
                      <button
                        onClick={() => setSelectedTree(tree.name)}
                        className="w-full font-bold py-2.5 rounded-xl bg-surface border border-sand text-forest hover:bg-cream transition-colors shadow-sm flex items-center justify-center gap-2"
                      >
                        ℹ️ More Info
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <TreeInfoPopup 
        isOpen={!!selectedTree} 
        treeName={selectedTree} 
        onClose={() => setSelectedTree(null)} 
      />
    </div>
  );
}
