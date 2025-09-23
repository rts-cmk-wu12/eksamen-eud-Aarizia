import { Inter } from "next/font/google";
import "./globals.css";
import styles from './page.module.scss';
import SiteHeader from "@/components/ui/site-header";
import SiteFooter from "@/components/ui/site-footer";
import { cookies } from "next/headers";

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

export default async function RootLayout({ children }) {

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('swaphub_access_token');
  const userId = cookieStore.get('swaphub_user_id');

  return (
    <html lang="en">
      <body className={`${inter.variable} ${styles.common_font} ${styles.common_color}`}>
        {accessToken && userId && <SiteHeader accessToken={accessToken.value} userId={userId.value} />}
        {!accessToken && !userId && <SiteHeader />}
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
