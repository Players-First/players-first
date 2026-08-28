import "./globals.css";
import "./v11.css";

export const metadata = {
  title: "Players First",
  description: "One community. Many voices."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <a className="graphics-fab" href="/graphics">Share graphics</a>
      </body>
    </html>
  );
}
