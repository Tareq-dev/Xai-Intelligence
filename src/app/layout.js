import "./globals.css";

export const metadata = {
  title: "Xai – Intelligence",
  description: "AI Intelligence Landing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
