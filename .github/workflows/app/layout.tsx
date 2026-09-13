import "./globals.css";

export const metadata = {
  title: "Subhash M — Digital Product Builder",
  description: "Portfolio of Subhash M — mobile apps, web products and real-world problem solving.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
