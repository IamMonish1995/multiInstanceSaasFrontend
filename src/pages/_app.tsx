import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Loader } from "@/components/Loader";
export const metadata: Metadata = {
  title: "Multi Instance Saas",
  description: "Multi Instance Saas",
};

export default function App({ Component, pageProps }: any) {
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ClerkProvider appearance={{ baseTheme: dark }}>
        <div className={inter.className}>
          <Toaster />
          <AuthProvider>
            <Loader />
            {getLayout(<Component {...pageProps} />)}
          </AuthProvider>
        </div>
      </ClerkProvider>
    </ThemeProvider>
  );
}
