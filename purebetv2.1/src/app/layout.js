import { Inter } from "next/font/google";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils"

import { WalletProviderComponent } from './context/WalletContext';
// import '@solana/wallet-adapter-react-ui/styles.css';
import Bottomnav from "./components/Bottomnav.jsx";
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
    <html className="bg-black" lang="en">

      <body  
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}
     >
      <WalletProviderComponent>
        {children}
        </WalletProviderComponent>
   <div className="md:hidden">   <Bottomnav /></div>  
        </body>
    </html>
  );
}
