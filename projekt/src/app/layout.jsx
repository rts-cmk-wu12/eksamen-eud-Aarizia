import { Inter } from "next/font/google";
import "./globals.css";
import styles from './page.module.scss';
import SiteHeader from "@/components/ui/site-header";
import SiteFooter from "@/components/ui/site-footer";

const inter = Inter({
  variable: "--font-inter",
  weight: ['400'],
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: '%s | SwapHub',
    default: 'SwapHub'
  },
  description: "En web-app for loppe entusiaster",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${styles.common_font} ${styles.common_color}`}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
