import "./globals.css";
import { JetBrains_Mono } from 'next/font/google';
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";

export const metadata = {
  title: "Mohammad Woafi | Personal Portfolio ",
  description: "The portfolio showcases my professional skills, projects, education, services, and experience",
};

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable}`}> {/* Apply font variable here */}
      <body className="leading-loose font-sans"> {/* Fallback to `font-sans` if needed */}
        <Navbar />
        <StairTransition />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}