import { Inter } from "next/font/google";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils"
import CustomCursor from "./CustomCursor";

import { WalletProviderComponent } from './context/WalletContext';
// import '@solana/wallet-adapter-react-ui/styles.css';
const inter = Inter({ subsets: ["latin"] });
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export const metadata = {
  title: "Purebet",
  description: "The sports betting experience you deserve",
};

export default function RootLayout({ children }) {
 
  return (
    <html className="bg-black custom-cursor overflow-x-hidden" lang="en">

      <body  
      className={cn(
        "min-h-screen bg-black font-sans  antialiased",
        fontSans.variable
      )}
     >
      {/* <CustomCursor/> */}
      <WalletProviderComponent>
        {children}
        </WalletProviderComponent>
        </body>
    </html>
  );
}
