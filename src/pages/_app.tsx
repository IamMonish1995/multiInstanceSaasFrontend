import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "#public/globals.css";
import { AuthProvider } from "#srccontexts/auth-context.tsx";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Multi Instance Saas",
  description: "Multi Instance Saas",
};

export default function App({ Component, pageProps }: any) {
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <div className={inter.className}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
      </ThemeProvider>
    </div>
  );
}
