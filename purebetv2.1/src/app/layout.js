import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProviderComponent } from './context/WalletContext';
// import '@solana/wallet-adapter-react-ui/styles.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Purebet",
  description: "The sports betting experience you deserve",
};

export default function RootLayout({ children }) {
  return (
    <html className="bg-black" lang="en">

      <body className={inter.className}>
      <WalletProviderComponent>
        {children}
        </WalletProviderComponent>
        </body>
    </html>
  );
}
