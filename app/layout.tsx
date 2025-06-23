import Header from "@/app/components/Header";
import "./globals.css";
// import { Water_Brush } from "next/font/google";
import { Work_Sans } from "next/font/google";
import { Carattere } from "next/font/google";
import Footer from "./components/Footer";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: "200",
  variable: "--font-work-sans",
});

// const waterBrush = Water_Brush({
//   subsets: ["latin"],
//   weight: "400",
//   variable: "--font-water",
// });

const carattere = Carattere({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-carattere",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${workSans.variable}${carattere.variable}`}>
      <head>
        <title>Ceyloan Eye Tours</title>
      </head>
      <body>
        <main className="pt-16">
          <>
            <Header />
            {children}
            <Footer />
          </>
        </main>
      </body>
    </html>
  );
}
