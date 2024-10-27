import { describe, expect, it } from "@jest/globals";
import { screen } from "@testing-library/dom";

import { completeImage, minimalImage } from "@/lib/content/test-image-data";
import createTestRender from "@/lib/createTestRender";

import Footer from ".";

describe("Footer", () => {
  it("should display the site content info", () => {
    renderFooter();
    const result = screen.getByRole("contentinfo");
    expect(result).toBeVisible();
  });

  it("should display the AMI logo", () => {
    renderFooter({ amiLogoData: completeImage });
    const result = screen.getByRole("img", { name: completeImage.description });
    expect(result).toBeVisible();
  });

  it("should display the CMI logo", () => {
    renderFooter({ cmiLogoData: completeImage });
    const result = screen.getByRole("img", { name: completeImage.description });
    expect(result).toBeVisible();
  });

  it("should display the copyright holder", () => {
    const copyrightHolder = "Foo Bar";
    renderFooter({ copyrightHolder });
    const result = screen.getByText(copyrightHolder, { exact: false });
    expect(result).toBeVisible();
  });

  it("should display the copyright year", () => {
    const copyrightYear = 1999;
    renderFooter({ copyrightYear });
    const result = screen.getByText(copyrightYear, { exact: false });
    expect(result).toBeVisible();
  });

  it("should display the current year", () => {
    const currentYear = 2077;
    renderFooter({ currentYear });
    const result = screen.getByText(currentYear, { exact: false });
    expect(result).toBeVisible();
  });

  it("should pass className to the outermost element", () => {
    const className = "foo";
    const result = renderFooter({ className });
    expect(result.container.firstChild).toHaveClass(className);
  });

  it("should match the snapshot", () => {
    const result = renderFooter();
    expect(result.container).toMatchSnapshot();
  });
});

const renderFooter = createTestRender(Footer, {
  amiLogoData: minimalImage,
  cmiLogoData: minimalImage,
  copyrightHolder: "Abigail Richbourg Liberty",
  copyrightYear: 2014,
  currentYear: 2024,
});
