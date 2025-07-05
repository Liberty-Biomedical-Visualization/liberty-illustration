import path from "path";

import { config as fontAwesomeConfig } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { Metadata } from "next";
import { Source_Sans_3 as SourceSans3 } from "next/font/google";
import type { ReactNode } from "react";

import Footer from "@/components/Footer";
import Header, { type HeaderProps } from "@/components/Header";
import type { Mutable } from "@/lib/Mutable";
import * as array from "@/lib/array";
import * as content from "@/lib/content";
import getPagePaths from "@/lib/getPagePaths";
import isInRootDir from "@/lib/isInRootDir";
import resolveClassNames from "@/lib/resolveClassNames";

import "./globals.css";

fontAwesomeConfig.autoAddCss = false;

export default async function RootLayout(props: Readonly<RootLayoutProps>) {
  const { children } = props;

  const className = resolveClassNames(
    "antialiased flex flex-col items-center min-h-screen p-4",
    sourceSans.className,
  );

  const siteMetadata = await content.getJsonByTitle("Site Metadata");
  const { author } = siteMetadata;

  const siteConfiguration = await content.getJsonByTitle("Site Configuration");
  const { amiLogoId, cmiLogoId, copyrightYear, navPageOrder, siteLogoId } =
    siteConfiguration;
  const amiLogoData = await content.getImageData(amiLogoId);
  const cmiLogoData = await content.getImageData(cmiLogoId);
  const siteLogoData = await content.getImageData(siteLogoId);

  const pages = getPages();
  navPageOrder.forEach((pageName, index) =>
    movePageToIndex(pages, pageName, index),
  );

  return (
    <html lang="en">
      <body className={className}>
        <Header className="mb-8" logoData={siteLogoData} pages={pages} />
        <main className="container mb-8">{children}</main>
        <Footer
          amiLogoData={amiLogoData}
          className="mt-auto"
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
  const { author, description, faviconId, keywords, locale, name, url } =
    siteMetadata;
  const title = { default: name, template: `%s | ${name}` };

  const siteConfiguration = await content.getJsonByTitle("Site Configuration");
  const faviconData = await content.getAssetData(faviconId);
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
    authors: { name: author, url },
    description,
    generator: "Next.js",
    keywords,
    icons: faviconData.url,
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

function getPages() {
  const pagePaths = getPagePaths("./src/app").filter(isInRootDir);
  return pagePaths.map(transformToPage);
}

function transformToPage(pagePath: string) {
  const page: HeaderProps["pages"][number] = {
    href: pagePath,
    name: transformToPageName(pagePath),
  };

  return page;
}

function transformToPageName(pagePath: string) {
  if (pagePath === "/") {
    return "Home";
  }

  return path
    .basename(pagePath)
    .split("-")
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join(" ");
}

function movePageToIndex(
  pages: Mutable<HeaderProps["pages"]>,
  pageName: string,
  targetIndex: number,
) {
  const currentIndex = pages.findIndex(
    (page) => page.name.toLowerCase() === pageName.toLocaleLowerCase(),
  );

  if (currentIndex === -1) {
    throw new Error(`page "${pageName}" not found`);
  }

  array.swap(pages, targetIndex, currentIndex);
}

const currentYear = new Date().getFullYear();
const sourceSans = SourceSans3({ subsets: ["latin"] });
