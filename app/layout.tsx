import "./globals.css";

export const metadata = {
  title: "Players First",
  description: "One community. Many voices."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
