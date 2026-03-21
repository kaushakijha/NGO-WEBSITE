import "./globals.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export const metadata = {
  title: "Renukiran Foundation — Plant Trees, Restore Nature",
  description: "Join Renukiran Welfare Foundation in our mission to reforest India. Plant a tree for ₹299 with GPS tracking, 3-year care, and digital certificates.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-cream text-bark antialiased min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
