import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aluguel de Máquina de Sorvete em Campinas | Me Gusta Sorvete Americano",
    template: "%s | Me Gusta Sorvete Americano",
  },
  description:
    "Alugue a máquina de sorvete americano para eventos em Campinas e região. Serviço completo com máquina + funcionário uniformizado. Sorvete à vontade por 4 horas.",
  keywords: [
    "aluguel de máquina de sorvete Campinas",
    "sorvete americano para casamentos",
    "buffet de sorvete corporativo",
    "máquina de sorvete com operador RMC",
    "sorvete americano para festas",
    "Campinas",
    "Região Metropolitana de Campinas",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "Aluguel de Máquina de Sorvete em Campinas",
    description:
      "Máquina + operador uniformizado. Sorvete à vontade por 4 horas. Ideal para casamentos, aniversários, corporativos e grandes eventos.",
    images: [
      {
        url: "/media/maquina-sorvete-led-casamento-campinas.webp",
        width: 573,
        height: 1024,
        alt: "Máquina de sorvete Me Gusta com iluminação em LED em evento em Campinas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aluguel de Máquina de Sorvete em Campinas",
    description:
      "Máquina + operador uniformizado. Sorvete à vontade por 4 horas. Eventos em Campinas e RMC.",
    images: ["/media/maquina-sorvete-led-casamento-campinas.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', { anonymize_ip: true });`}
            </Script>
          </>
        ) : null}

        {metaPixelId ? (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaPixelId}');
fbq('track', 'PageView');`}
          </Script>
        ) : null}

        {children}
      </body>
    </html>
  );
}
