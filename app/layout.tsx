import './globals.css';
import { Exo } from 'next/font/google';
import type { Metadata } from 'next';
import Providers from './providers';

const exo = Exo({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-exo-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'OMEGON',
  description: 'Diseñamos con propósito, desarrollamos con precisión.',
  viewport: 'width=device-width, initial-scale=1.0',
  keywords: [
    'Tecnología', 'UX/UI', 'Desarrollo Web', 'Software', 'IA', 'Transformación Digital'
  ],
  openGraph: {
    title: 'OMEGON',
    description: 'Diseñamos con propósito, desarrollamos con precisión.',
    url: 'https://omegon.com.ar',
    siteName: 'OMEGON',
    images: [
      {
        url: 'https://omegon.com.ar/assets/logos/logo_omegon.jpg',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OMEGON',
    description: 'Diseñamos con propósito, desarrollamos con precisión.',
    images: ['https://omegon.com.ar/assets/logos/logo_omegon.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={exo.variable}>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-black text-white font-sans antialiased">
         <Providers>
         {children}
        </Providers>
     </body>
    </html>
  );
}
