import { describe, expect, it } from "@jest/globals";
import { screen } from "@testing-library/dom";

import { describedImage, minimalImage } from "@/lib/content/test-image-data";
import createTestRender from "@/lib/createTestRender";

import CmiCertification from ".";

describe("CmiCertification", () => {
  it("should display text describing the certification", () => {
    renderCmiCertification();

    const textA = screen.getByText("Board Certified Medical Illustrator");
    expect(textA).toBeVisible();

    const textB = screen.getByText(
      "by the Board of Certification of Medical Illustrators",
    );
    expect(textB).toBeVisible();
  });

  it("should display an accessible logo with default name when passed logo data has no description", () => {
    renderCmiCertification();
    const result = screen.getByRole("img", {
      name: "CMI, Board of Certification of Medical Illustrators.",
    });
    expect(result).toBeVisible();
  });

  it("should display an accessible logo with passed description when passed logo data with a description", () => {
    renderCmiCertification({ logoData: describedImage });
    const result = screen.getByRole("img", {
      name: describedImage.description,
    });
    expect(result).toBeVisible();
  });

  it("should pass className to the outermost element", () => {
    const className = "foo";
    const result = renderCmiCertification({ className });
    expect(result.container.firstChild).toHaveClass(className);
  });

  it("should match the snapshot", () => {
    const result = renderCmiCertification();
    expect(result.container).toMatchSnapshot();
  });
});

const renderCmiCertification = createTestRender(CmiCertification, {
  logoData: minimalImage,
});
