import { Suspense } from "react";
import {
  Poppins,
  Roboto,
  Lobster,
  Caveat,
  Work_Sans,
  Outfit,
  Hind_Siliguri,
} from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Navbar from "../components/sheard/Navbar";
import Footer from "@/components/sheard/Footer";
import TopHeader from "@/components/sheard/TopHeader";
import PaymentMethod from "@/components/sheard/PaymentMethod";
import ReduxProviderWrapper from "@/components/ReduxProvaiderWrapper";
import { LanguageProvider } from "@/context/LanguageContext";
import { SettingsProvider } from "@/context/SettingsContext";
import MouseCursorEffect from "@/components/ui/MouseCursorEffect";
import FacebookPixel from "@/components/sheard/FacebookPixel";

// Google Fonts
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});
const lobster = Lobster({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-lobster",
});
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-caveat",
});
const worksans = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-work",
});
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});
// Hind Siliguri for Bengali text
const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
});

export const metadata = {
  title: "Bd Calling Academy",
  description:
    "Bdcalling Academy — a leading IT training institute in Bangladesh and a proud part of Betopia Group. We specialize in career-oriented education designed to help you develop practical digital skills and grow professionally.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${roboto.variable} ${lobster.variable} ${caveat.variable} ${worksans.variable} ${outfit.variable} ${hindSiliguri.variable}`}
    >
      <head>
        {/* Meta Pixel Code */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1347844743764522');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className="antialiased">
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1347844743764522&ev=PageView&noscript=1"
          />
        </noscript>
        <ReduxProviderWrapper>
          <LanguageProvider>
            <SettingsProvider>
              <Suspense fallback={null}>
                <FacebookPixel />
              </Suspense>
              <MouseCursorEffect />
              {children}
            </SettingsProvider>
          </LanguageProvider>
        </ReduxProviderWrapper>
      </body>
    </html>
  );
}
