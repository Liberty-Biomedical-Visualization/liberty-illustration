import { describe, expect, it } from "@jest/globals";
import { screen } from "@testing-library/dom";

import { describedImage, minimalImage } from "@/lib/content/test-image-data";
import createTestRender from "@/lib/createTestRender";

import AmiMember from ".";

describe("AmiMember", () => {
  it("should display an accessible logo with default name when passed logo data has no description", () => {
    renderAmiMember();
    const result = screen.getByRole("img", {
      name: "Association of Medical Illustrators member.",
    });
    expect(result).toBeVisible();
  });

  it("should display an accessible logo with passed description when passed logo data with a description", () => {
    renderAmiMember({ logoData: describedImage });
    const result = screen.getByRole("img", {
      name: describedImage.description,
    });
    expect(result).toBeVisible();
  });

  it("should pass className to the outermost element", () => {
    const className = "foo";
    const result = renderAmiMember({ className });
    expect(result.container.firstChild).toHaveClass(className);
  });

  it("should match the snapshot", () => {
    const result = renderAmiMember();
    expect(result.container).toMatchSnapshot();
  });
});

const renderAmiMember = createTestRender(AmiMember, { logoData: minimalImage });
