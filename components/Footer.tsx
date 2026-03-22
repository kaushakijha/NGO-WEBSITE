"use client";

import Link from "next/link";
import { useState } from "react";
import TreeInfoPopup from "./TreeInfoPopup";

const TREE_LIST = [
  "Aadusa Tree", "Aak Tree", "Acacia Tree", "Adusa Tree", "African Mahogany Tree", "Agarwood Tree", "Alder Tree", "Alpine Ash Tree", "Amla Tree", "Andaman Padauk Tree", "Anjan Tree", "Apple Bear", "Apple Blossom Tree", "Arabian Gum Tree", "Arboreal icons", "Argentine Mesquite Tree", "Arjuna Tree", "Ashoka Tree", "Aspen Tree", "Australian Blackwood Tree", "Australian Buloke Tree", "Australian Rosewood Tree", "Avocado Tree", "Babul Trees", "Badam Tree", "Bael Tree", "Bakain Tree", "Bakayan Neem Tree", "Bald Cypress Tree", "Balsam Tree", "Bamboo Tree", "Banyan Tree", "Baobab Tree", "Barbados Cherry Tree", "Bastard Teak Tree", "Beach Almond Tree", "Behada Tree", "Belpatra Tree", "Ber Tree", "Betel Nut Palm Tree", "Bhojpatra Tree", "Big Leaf Mahogany Tree", "Bija Tree", "Birch tree", "Black Alder Tree", "Black Ash Tree", "Black Ironwood Tree", "Black Mulberry Tree", "Black Poplar Tree", "Black Willow Tree", "Blackboard Tree", "Bottle Brush Tree", "Bougainvillea Plant", "Boxwood Tree", "Brazilian Rosewood Tree", "Breadfruit Tree", "Broadleaf Maple Tree", "Buddha Coconut Tree", "Buddha S Hand Tree", "Buransh Tree", "Burma Padauk Tree", "Burmese Grape Tree", "Butter Tree", "Buttercup Tree", "California Laurel Tree", "Calliandra Tree", "Camphorwood Tree", "Canary Island Pine Tree", "Cannonball Tree", "Capirona Tree", "Caribbean Pine Tree", "Carissa Carandas (Karwand)", "Carolina Silverbell Tree", "Cashew Tree", "Cassia Tree", "Casuraniya Suru Tree", "Casurina Tree", "Ceylon Date Palm Tree", "Ceylon Ironwood Tree", "Ceylon Olive Tree", "Chafa Tree", "Champa White", "Chandni Tree", "Charoli Tree", "Chaste Tree", "Chebulic Myrobalan Tree", "China Palm Tree", "Chinar Tree", "Chinese Chestnut Tree", "Chinese Elm Tree", "Chinese Parasol Tree", "Chinese Pistachio Tree", "Chinese Tallow Tree", "Chinese Toon Tree", "Chirol Tree", "Chironji Tree", "Chokecherry Tree", "Christmas Tree", "Cinnamon Tree", "Citron Tree", "Coastal Redwood Tree", "Coastal Wattle Tree", "Cocoa Tree", "Coconut Tree", "Coffee Arabica Tree", "Cogon Grass Tree", "Common Alder tree", "Common Hornbeam tree", "Common Juniper tree", "Common Walnut Tree", "Congo Mahogany Tree", "Cotton Tree", "Cottonwood Tree", "Crape Myrtle tree", "Crow S Ash Tree", "Cuban Laurel Tree", "Cuban Mahogany Tree", "Cucumber Tree", "Curry Leaf Tree", "Custard Apple Tree", "Deodar Tree", "Desert Date Tree", "Desert Ironwood Tree", "Desert Willow Tree", "Dhawada Tree", "Dita Tree", "Diya Plant Tree", "Dogwood Tree", "Dragon Tree", "Drumstick Tree", "Dtarkumari Tree", "Dudhi Tree", "Durva Grass", "Eastern Hemlock Tree", "Eastern Redbud Tree", "Eastern White Pine Tree", "Ebony Apple Tree", "Elderberry Tree", "Elephant Foot Tree", "Eucalyptus Tree", "European Ash tree", "European Beech tree", "European Hornbeam tree", "European Larch tree", "European Linden tree", "European Yew tree", "Evergreen Magnolia Tree", "False Acacia Tree", "False Mahogany Tree", "False Nutmeg Tree", "False Tamarind Tree", "False White Teak Tree", "Fever Tree", "Fig Tree", "Fir Tree", "Firewheel Tree", "Fish Poison Tree", "Flame Of The Forest Tree", "Fragrant Cedar Tree", "French Tamarisk Tree", "Gamhar Tree", "Giant Redwood Tree", "Giant Sequoia Tree", "Glossy Abelia Tree", "Gmelina Tree", "Golden Ash Tree", "Golden Bottle Brush Tree", "Golden Duranta Tree", "Golden Larch Tree", "Golden Trumpet Tree", "Grand Fir Tree", "Gray Birch Tree", "Green Ash Tree", "Green Fountain Grass", "Greenheart Tree", "Guava Tree", "Gudhal Plant", "Guggal Tree", "Guiana Chestnut Tree", "Gulbhendi Tree", "Gulmohar Tree", "Gultara Tree", "Gutta-Percha Tree", "Hackberry Tree", "Hamellia Tree", "Harsingar Tree", "Hawaiian Sandalwood Tree", "Hemlock Tree", "Hickory Tree", "Himalayan Cedar Tree", "Himalayan Fir Tree", "Himalayan Maple Tree", "Himalayan Oak Tree", "Hog Plum Tree", "Hollong Tree", "Honey Locust Tree", "Horse Chestnut Tree", "Indian Almond Tree", "Indian Bay Tree", "Indian Beech Tree", "Indian Birch Tree", "Indian Cedar Tree", "Indian Cherry Tree", "Indian Coral Tree", "Indian Cork Fig", "Indian Cork Oak Tree", "Indian Cork Tree", "Indian Corkwood Tree", "Indian Devil Tree", "Indian Ebony Tree", "Indian Elm Tree", "Indian Fire Tree", "Indian Ginseng Tree", "Indian Kino Tree", "Indian Laurel Fig Tree", "Indian Laurel Tree", "Indian Mahogany Tree", "Indian Mahua Tree", "Indian Medlar Tree", "Indian Peach Tree", "Indian Persimmon Tree", "Indian Poison Nut Tree", "Indian Raintree Tree", "Indian Red Sandalwood Tree", "Indian Rosewood Tree", "Indian Screw Pine Tree", "Indian Tulip Tree", "Indian White Cedar Tree", "Indian Willow Tree", "Ironwood Tree", "Italian Basil", "Italian Cypress Tree", "Ivory Palm Tree", "Jacaranda Blue Tree", "Jackalberry Tree", "Jackfruit Tree", "Jammi Chettu", "Jamun Tree", "Japanese Ash tree", "Japanese Beech tree", "Japanese Cedar tree", "Japanese Cherry tree", "Japanese Holly tree", "Japanese Maple tree", "Japanese Pagoda tree", "Japanese Walnut tree", "Jasmin Tree", "Jasvanti Plant", "Java Apple Tree", "Javanese Almond Tree", "Jelly Palm Tree", "Jujube Tree", "Jungle Jalebi Tree", "Juniper tree", "Kachnar Tree", "Kadamba Tree", "Kali Mirch Tree", "Kalmegh Plant", "Kapok Tree", "Karanj Tree", "Karonda Tree", "Kaahid Tree", "Katesawar Tree", "Keshriya Sayma Tree", "Khair Tree", "Khaya Tree", "Khejri Tree", "Kher Tree", "Khirni Tree", "Kikar Tree", "Kingswood Tree", "Kokam Tree", "Korean Pine Tree", "Lady S Slipper Tree", "Larch tree", "Lasoora Tree", "Lathzira Tree", "Laung Tree", "Laurel Fig Tree", "Laxmi Kamal Tree", "Laxmi Taru Tree", "Lemon Eucalyptus Tree", "Lemon Tree", "Lemon-Scented Gum Tree", "Lemongrass", "Licorice Tree", "Little Leaf Linden Tree", "Littleleaf Boxwood Tree", "Locust Tree", "Longan Tree", "Loquat Tree", "Macadamia Tree", "Magnolia tree", "Mahua Tree", "Malabar Chestnut Tree", "Malabar Plum Tree", "Mango Pine Tree", "Mango Tree", "Mangosteen Tree", "Mangroves", "Manikara Tree", "Maple Tree Magic", "Mast Tree", "Matti Tree", "Moulsari Tree", "Mehandi Tree", "Mexican Ash Tree", "Mexican Cypress Tree", "Mexican Elder Tree", "Mexican Plum Tree", "Midnight Horror Tree", "Moha Tree", "Monkey Hand Tree", "Monkey Pod Tree", "Moreton Bay Fig Tree", "Mosambi Tree", "Mountain Ash Tree", "Mountain Cherry Tree", "Mountain Ebony Tree", "Mountain Gum Tree", "Mountain Laurel Tree", "Muchkand Tree", "Muskwood Tree", "Myrobalan Tree", "Myrtle Tree", "Nagkesara Tree", "Narrow Leaf Ash Tree", "Natal Mahogany Tree", "Native Olive Tree", "Neem Tree", "Noni Tree", "North Indian Rosewood Tree", "Norway Maple Tree", "Norway Spruce tree", "Nutmeg Tree", "Oak Tree", "Orange Tree", "Oriental Plane Tree", "Pacific Dogwood Tree", "Painted Maple tree", "Palash Tree", "Palm Tree", "Palo Santo Tree", "Panama Redwood Tree", "Pangara Tree", "Paperbark Maple tree", "Paperbark Tea Tree", "Paraguayan Holly Tree", "Paras Pipal Tree", "Peepal Tree", "Peltaform Tree", "Pencil Cedar Tree", "Pencilwood Tree", "Persian Lilac Tree", "Persian Silk Tree", "Peruvian Pepper Tree", "Philippine Ebony Tree", "Philkan Tree", "Pink Trumpet Tree", "Plumeria Tree", "Pomegranate tree", "Pond Cypress Tree", "Poplar tree", "Pride Of India Tree", "Purple Beech tree", "Purple Orchid Tree", "Putranjiva Tree", "Queensland Blackbutt Tree", "Queensland Kauri Tree", "Queensland Maple Tree", "Queensland Silver Wattle Tree", "Quinine Tree", "Raatrani Tree", "Rain Tree", "Rainforest Plum Tree", "Red Alder tree", "Red Beech tree", "Red Bloodwood Tree", "Red Bottle Brush Tree", "Red Flowering Gum Tree", "Red Fountain Grass", "Red Horse Chestnut tree", "Red Kapok Tree", "Red Oak tree", "Red Pine tree", "Red Silk Cotton Tree", "Red Silkwood Tree", "Redwood Ash Tree", "Redwood tree", "River Birch tree", "River Red Gum Tree", "River Sheoak Tree", "Rocky Mountain Maple tree", "Rose (Rosa) Tree", "Rose Myrtle Tree", "Rough Barked Apple Tree", "Royal Palm Tree", "Sacred Bark Tree", "Sago Palm Tree", "Saja Tree", "Sal Tree", "Sand Olive Tree", "Sand Paper Tree", "Sandalwood Tree", "Santa Maria Tree", "Sapodilla Tree", "Sapota (Chiku) Tree", "Saptparni Tree", "Satinwood Tree", "Satwin Tree", "Sausage Tree", "Scarlet Maple tree", "Scarlet Sterculia Tree", "Scopiya Tree", "Screwpine Tree", "Seaside Mahoe Tree", "Semal Tree", "Shagbark Hickory tree", "Shailendra Tree", "Shami Tree", "Shatavari Plant", "Shawani Tree", "Shirish Tree", "Shisham Tree", "Shravani Tree", "Silk Cotton Tree", "Silver Birch tree", "Silver Fir tree", "Silver Lime tree", "Silver Oak Tree", "Siris Tree", "Sissoo Tree", "Sita Ashoka Tree", "Snake Bean Tree", "Snakewood Tree", "Snow Gum Tree", "Snowbell Tree", "Soap Nut Tree", "Soapberries Trees", "Soursop Tree", "Southern Beech tree", "Southern Magnolia tree", "Spanish Cedar Tree", "Spanish Fir tree", "Spanish Oak tree", "Spindle tree", "Spotted Gum Tree", "Spruce tree", "Star Apple Tree", "State Trees", "Stinking Cedar Tree", "Stinking Mahogany Tree", "Strangler Fig Tree", "Studioseeds Tree", "Sugar Maple tree", "Sugar Pine tree", "Supari Tree", "Swamp Mahogany Tree", "Sweet Acacia Tree", "Sweet Cherry tree", "Sweet Chestnut tree", "Sweet Fern Tree", "Swiss Pine tree", "Sycamore tree", "Tallowwood Tree", "Tamarillo Tree", "Tamarind Tree", "Tea Tree", "Teak Tree", "Techer Plant Tree", "Tekoma Tree", "Tembhurni Tree", "Thabobia Plant", "The Aadoo Tree", "The Aspalove Tree", "The Chatim Tree", "The Indian Laburnum Tree", "The Kanchan Tree", "The Kaner Tree", "The Papari Tree", "The Papaya Tree", "The Pink Poui Tree", "The Poovarasu Tree", "The Secret Life Of Roots", "The Shahtoot Tree", "Tibetan Birch Tree", "Tiger Almond Tree", "Toon Tree", "Toothbrush Tree", "Tropical Birch Tree", "Trumpet Vine Tree", "Tulip Poplar tree", "Tulipwood", "Turkish Pine tree", "Umbrella Pine tree", "Unlocking The Secrets Of The Lucky Bean Tree", "Vanilla Tree", "Velvet Apple Tree", "Vidha Plant Tree", "Walnut Tree", "Wampi Tree", "Water Apple Tree", "Waval Tree", "Weeping Ash tree", "Weeping Elm tree", "Weeping Willow tree", "West Indian Mahogany Tree", "White Acacia Tree", "White Cedar tree", "White Cheesewood Tree", "White Mulberry tree", "White Oak tree", "White Sagewood Tree", "White Silk Cotton Tree", "Wild Almond Tree", "Wild Badam Tree", "Wild Date Palm Tree", "Wild Fig Tree", "Wild Pistachio Tree", "Willow Tree Wonders", "Wine Palm Tree", "Yellow Box Tree", "Yellow Elder Tree", "Yellow Meranti Tree", "Yellow Poplar tree", "Yellow Teak Tree", "Yellowwood Tree", "Yew Tree Wonders", "Yunnan Hackberry Tree", "Zanzibar Mahogany Tree", "Zanzibar Nutmeg Tree", "Ziziphus Tree"
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [selectedTree, setSelectedTree] = useState<string | null>(null);

  const handleSubscribe = () => {
    if (email.includes("@")) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-forest text-white/80 relative overflow-hidden">
      {/* CTA Strip */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="relative -mt-0 mb-0 md:-mt-0 lg:-mt-0">
          <div className="rounded-t-2xl bg-gradient-to-r from-accent-dark via-accent to-accent-light p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-accent/20">
            <div className="flex flex-col gap-2 text-center md:text-left">
              <h3 className="heading-serif text-2xl md:text-3xl font-bold text-white">
                Ready to plant your first tree?
              </h3>
              <p className="text-white/80 text-sm md:text-base">
                Every tree creates oxygen for one person for a full year.
              </p>
            </div>
            <Link
              href="/marketplace"
              className="flex-shrink-0 h-12 px-8 flex items-center justify-center rounded-full bg-white text-accent-dark text-base font-bold hover:bg-cream transition-all shadow-lg hover:scale-105 active:scale-95"
            >
              🌿 Start Planting — ₹299
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative leaf pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-5">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <path d="M100 10C100 10 30 50 30 120C30 158.66 61.34 190 100 190C138.66 190 170 158.66 170 120C170 50 100 10 100 10Z" fill="white"/>
        </svg>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
                <path d="M16 2C16 2 6 8 6 18C6 23.5228 10.4772 28 16 28C21.5228 28 26 23.5228 26 18C26 8 16 2 16 2Z" fill="#34d399" opacity="0.9"/>
                <path d="M16 8C16 8 11 13 11 19C11 21.7614 13.2386 24 16 24C18.7614 24 21 21.7614 21 19C21 13 16 8 16 8Z" fill="#d4a843" opacity="0.6"/>
                <path d="M16 28V12" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
              </svg>
              <div>
                <h2 className="heading-serif text-lg font-bold text-white">Renukiran</h2>
                <p className="text-[9px] text-white/40 tracking-[0.2em] uppercase font-semibold">Foundation</p>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Dedicated to restoring India&apos;s green cover, one tree at a time. 1.2M+ trees planted across 150+ locations.
            </p>
            <div className="flex gap-2 mt-1">
              {[
                { label: "Instagram", path: "M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2C22,19.4 19.4,22 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8C2,4.6 4.6,2 7.8,2M7.6,4C5.61,4 4,5.61 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4C18.39,20 20,18.39 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5C17.94,5.5 18.5,6.06 18.5,6.75C18.5,7.44 17.94,8 17.25,8C16.56,8 16,7.44 16,6.75C16,6.06 16.56,5.5 17.25,5.5M12,7C14.76,7 17,9.24 17,12C17,14.76 14.76,17 12,17C9.24,17 7,14.76 7,12C7,9.24 9.24,7 12,7M12,9C10.34,9 9,10.34 9,12C9,13.66 10.34,15 12,15C13.66,15 15,13.66 15,12C15,10.34 13.66,9 12,9Z" },
                { label: "Twitter", path: "M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10V10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.19,14.41 4.53,14.46 3.89,14.36C4.43,16.06 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" },
                { label: "LinkedIn", path: "M19,3C20.1,3 21,3.9 21,5V19C21,20.1 20.1,21 19,21H5C3.9,21 3,20.1 3,19V5C3,3.9 3.9,3 5,3H19M18.5,18.5V13.2C18.5,11.36 17.29,10.35 15.78,10.35C14.84,10.35 14.06,10.88 13.75,11.55V10.5H11.5V18.5H13.75V13.5C13.75,12.67 14.42,12 15.25,12C15.79,12 16.25,12.46 16.25,13V18.5H18.5M6.5,8.31C7.25,8.31 7.81,7.75 7.81,7C7.81,6.25 7.25,5.69 6.5,5.69C5.75,5.69 5.19,6.25 5.19,7C5.19,7.75 5.75,8.31 6.5,8.31M7.63,18.5V10.5H5.38V18.5H7.63Z" },
                { label: "YouTube", path: "M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z" },
              ].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  className="size-10 flex items-center justify-center rounded-xl bg-white/5 text-white/40 hover:bg-primary/20 hover:text-leaf transition-all duration-300"
                  aria-label={s.label}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d={s.path}/></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-accent mb-5">Explore</h3>
            <ul className="flex flex-col gap-3 text-sm text-white/50">
              <li><Link className="hover:text-leaf transition-colors" href="/mission">About Us</Link></li>
              <li><Link className="hover:text-leaf transition-colors" href="/tracking">Our Projects</Link></li>
              <li><Link className="hover:text-leaf transition-colors" href="/csr">CSR Partnerships</Link></li>
              <li><Link className="hover:text-leaf transition-colors" href="/marketplace">Gift a Tree</Link></li>
              <li><Link className="hover:text-leaf transition-colors" href="/dashboard">My Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-accent mb-5">Resources</h3>
            <ul className="flex flex-col gap-3 text-sm text-white/50">
              <li><a className="hover:text-leaf transition-colors" href="#">How It Works</a></li>
              <li><a className="hover:text-leaf transition-colors" href="#">FAQs</a></li>
              <li><a className="hover:text-leaf transition-colors" href="#">Blog</a></li>
              <li><a className="hover:text-leaf transition-colors" href="#">Contact Us</a></li>
              <li><a className="hover:text-leaf transition-colors" href="#">Careers</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-accent mb-5">Stay Updated</h3>
            <p className="text-sm text-white/40 mb-4">Get updates on our plantations and environmental impact stories.</p>
            <div className="flex flex-col gap-3">
              <input
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/25 focus:border-leaf focus:ring-1 focus:ring-leaf/30 focus:outline-none transition-all"
                placeholder="your@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className={`w-full rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 ${
                  subscribed
                    ? "bg-leaf/20 text-leaf border border-leaf/30"
                    : "bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-lg hover:shadow-primary/25"
                }`}
                type="button"
                onClick={handleSubscribe}
              >
                {subscribed ? "✓ Subscribed!" : "Subscribe →"}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">© 2026 Renukiran Welfare Foundation. All rights reserved. Section 80G registered.</p>
          <div className="flex gap-6 text-xs text-white/30">
            <a className="hover:text-leaf transition-colors" href="#">Privacy</a>
            <a className="hover:text-leaf transition-colors" href="#">Terms</a>
            <a className="hover:text-leaf transition-colors" href="#">Refund</a>
          </div>
        </div>
      </div>

      {/* HUGE TREE LIST SEO FOOTER AS REQUESTED */}
      <div className="bg-[#1c1c1c] pt-12 pb-24 px-4 md:px-8 border-t border-white/5 relative z-10 w-full flex flex-col items-center overflow-hidden">
        <h3 className="text-white/90 text-2xl font-bold font-serif mb-6 text-center">Tree in India</h3>
        <p className="text-[#8a8a8a] text-[10px] md:text-[11px] leading-[2] text-center max-w-[1400px] mx-auto font-sans tracking-tight">
          <span className="text-white/60">Popular Trees For Plantation: </span>
          {TREE_LIST.map((tree, index) => (
            <span key={index}>
              <a 
                href={`/marketplace?tree=${encodeURIComponent(tree)}`} 
                onClick={(e) => { e.preventDefault(); setSelectedTree(tree); }}
                className="hover:text-white hover:underline transition-colors underline-offset-2 cursor-pointer"
              >
                {tree}
              </a>
              {index < TREE_LIST.length - 1 ? " , " : ""}
            </span>
          ))}
        </p>
        
        <p className="text-[#a0a0a0] text-sm mt-12 mb-8 font-medium">© 2026, Renukiran Foundation</p>
        
        {/* Tree Line Image Border mapped with tiny CSS trees */}
        <div 
          className="absolute bottom-0 left-0 w-full h-[60px] md:h-[80px] bg-repeat-x bg-bottom opacity-70"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 120 120\' preserveAspectRatio=\'none\'%3E%3Cpath fill=\'%23658f4c\' d=\'M60 20 L90 80 H65 V120 H55 V80 H30 Z\'/%3E%3Cpath fill=\'%234a6e35\' d=\'M40 40 L65 90 H50 V120 H40 V90 H25 Z\'/%3E%3Cpath fill=\'%235b8040\' d=\'M80 35 L105 85 H90 V120 H80 V85 H65 Z\'/%3E%3C/svg%3E")', backgroundSize: '70px 100%' }}
        />
      </div>
      <TreeInfoPopup 
        isOpen={!!selectedTree} 
        treeName={selectedTree} 
        onClose={() => setSelectedTree(null)} 
      />
    </footer>
  );
}
