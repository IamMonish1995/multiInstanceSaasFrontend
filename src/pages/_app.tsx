import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "#public/globals.css";
import { AuthProvider } from "#srccontexts/auth-context.tsx";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
export const metadata: Metadata = {
  title: "Multi Instance Saas",
  description: "Multi Instance Saas",
};

export default function App({ Component, pageProps }: any) {
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <div className={inter.className}>
      <Toaster />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ClerkProvider appearance={{ baseTheme: dark }}>
          <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
        </ClerkProvider>
      </ThemeProvider>
    </div>
  );
}
