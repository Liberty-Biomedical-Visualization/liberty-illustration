import { describe, expect, it } from "@jest/globals";
import { screen } from "@testing-library/dom";

import { completeImage, minimalImage } from "@/lib/content/test-image-data";
import createTestRender from "@/lib/createTestRender";

import Certifications from ".";

describe("Certifications", () => {
  it("should display a list", () => {
    renderCertifications();
    const result = screen.getByRole("list");
    expect(result).toBeVisible();
  });

  it("should display a list item containing the AMI logo", () => {
    renderCertifications({ amiLogoData: completeImage });
    const listItems = screen.getAllByRole("listitem");
    const logo = screen.getByRole("img", { name: completeImage.description });
    const containsLogo = listItems.some((listItem) => listItem.contains(logo));
    expect(containsLogo).toBe(true);
  });

  it("should display a list item containing the CMI logo", () => {
    renderCertifications({ cmiLogoData: completeImage });
    const listItems = screen.getAllByRole("listitem");
    const logo = screen.getByRole("img", { name: completeImage.description });
    const containsLogo = listItems.some((listItem) => listItem.contains(logo));
    expect(containsLogo).toBe(true);
  });

  it("should pass className to the outermost element", () => {
    const className = "foo";
    const result = renderCertifications({ className });
    expect(result.container.firstChild).toHaveClass(className);
  });

  it("should match the snapshot", () => {
    const result = renderCertifications();
    expect(result.container).toMatchSnapshot();
  });
});

const renderCertifications = createTestRender(Certifications, {
  amiLogoData: minimalImage,
  cmiLogoData: minimalImage,
});
