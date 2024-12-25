import "./globals.css";
import { Poppins } from 'next/font/google'

export const metadata = {
  title: "Mail Scheduler - DemTech.ai",
  description: "Built by Neeraj using create-next-app",
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        {children}
      </body>
    </html>
  );
}
