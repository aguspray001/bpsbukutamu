import "./globals.css";
import type { Metadata } from "next";
// import { Roboto } from "next/font/google";
import { Layout, FixedPlugin } from "@/components";

// const roboto = Roboto({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "700", "900"],
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "Buku Tamu | BPS Sidoarjo",
  description:
    "Buku tamu kunjungan website BPS Sidoarjo guna pendataan hasil kunjungan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* <l
          defer
          data-site="YOUR_DOMAIN_HERE"
          src="https://api.nepcha.com/js/nepcha-analytics.js"
        ></script> */}
        <link rel="shortcut icon" href="/logos/logo-bps.png" type="image/png" />
      </head>
      {/* <body className={roboto.className}> */}
      <body>
        <Layout>
          {children}
          <FixedPlugin />
        </Layout>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          rel="stylesheet"
          href="node_modules/@material-tailwind/html@latest/scripts/dialog.js"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/@material-tailwind/html@latest/scripts/dialog.js"
        />
      <script
        type="module"
        src="node_modules/@material-tailwind/html@latest/scripts/popover.js"
      ></script>
      <script
        type="module"
        src="https://unpkg.com/@material-tailwind/html@latest/scripts/popover.js"
      ></script>
      </body>
    </html>
  );
}
