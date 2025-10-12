import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-root">
          <main className="content">{children}</main>
          <div className="bottom-shadow" aria-hidden="true" />
        </div>
      </body>
    </html>
  );
}
