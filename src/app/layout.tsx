import { config as fontAwesomeConfig } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { Metadata } from "next";
import { Source_Sans_3 as SourceSans3 } from "next/font/google";
import type { ReactNode } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import * as content from "@/lib/content";
import resolveClassNames from "@/lib/resolveClassNames";

import "./globals.css";

fontAwesomeConfig.autoAddCss = false;

export default async function RootLayout(props: Readonly<RootLayoutProps>) {
  const { children } = props;
  const className = resolveClassNames("antialiased", sourceSans.className);

  const siteMetadata = await content.getJsonByTitle("Site Metadata");
  const { author } = siteMetadata;

  const siteConfiguration = await content.getJsonByTitle("Site Configuration");
  const { amiLogoId, cmiLogoId, copyrightYear, siteLogoId } = siteConfiguration;
  const amiLogoData = await content.getImageData(amiLogoId);
  const cmiLogoData = await content.getImageData(cmiLogoId);
  const siteLogoData = await content.getImageData(siteLogoId);

  return (
    <html lang="en">
      <body className={className}>
        <Header className="mb-8 mt-4 mx-4" logoData={siteLogoData} />
        <main className="container mx-auto">{children}</main>
        <Footer
          amiLogoData={amiLogoData}
          className="mb-4 mt-8 mx-4"
          cmiLogoData={cmiLogoData}
          copyrightHolder={author}
          copyrightYear={copyrightYear}
          currentYear={currentYear}
        />
      </body>
    </html>
  );
}

export interface RootLayoutProps {
  children: ReactNode;
}

export async function generateMetadata() {
  const siteMetadata = await content.getJsonByTitle("Site Metadata");
  const { author, description, keywords, locale, name, url } = siteMetadata;
  const title = { default: name, template: `%s | ${name}` };

  const siteConfiguration = await content.getJsonByTitle("Site Configuration");
  const logoData = await content.getImageData(siteConfiguration.siteLogoId);
  const image = {
    alt: logoData.description ?? `${name} logo.`,
    height: logoData.height,
    url: logoData.src,
    width: logoData.width,
  };

  const metadata: Metadata = {
    appleWebApp: { title: name, statusBarStyle: "default" },
    applicationName: name,
    authors: { name: author, url: url },
    description,
    generator: "Next.js",
    keywords,
    openGraph: {
      description,
      images: image,
      locale,
      siteName: name,
      title,
      type: "website",
      url,
    },
    referrer: "strict-origin-when-cross-origin",
    robots: "index, follow",
    title,
    twitter: {
      card: "summary",
      description,
      images: image,
      title,
    },
  };

  return metadata;
}

const currentYear = new Date().getFullYear();
const sourceSans = SourceSans3({ subsets: ["latin"] });
