"use client";
import React, { ReactNode } from "react";
import Script from "next/script";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      {/* Providers como ThemeProvider de Tailwind, contexto propio, etc. si es que usás alguno */}

      {children}

      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-0MMCPMXS8G"
        strategy="lazyOnload"
        defer
      />
      <Script id="google-analytics" strategy="lazyOnload" defer>
        {`window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}  
         gtag('js', new Date());
         gtag('config', 'G-0MMCPMXS8G');`}
      </Script>

      {/* Scripts externos */}
      <Script
        src="https://cdn.lordicon.com/bhenfmcm.js"
        strategy="lazyOnload"
        defer
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        defer
      />
    </>
  );
}
