"use client";

import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ROUTES } from "@/helpers/routs";
import Header from "@/components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-root">
          <Header />
          <main className="content">{children}</main>
          <div className="bottom-shadow" aria-hidden="true" />
        </div>
      </body>
    </html>
  );
}
