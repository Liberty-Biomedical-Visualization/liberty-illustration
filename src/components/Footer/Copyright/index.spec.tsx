import { describe, expect, it } from "@jest/globals";
import { screen } from "@testing-library/react";

import createTestRender from "@/lib/createTestRender";

import Copyright from ".";

describe("Copyright", () => {
  it("should display initialYear when currentYear is equal to initialYear", () => {
    const holder = "John Doe";
    const year = 2024;
    renderCopyright({ currentYear: year, holder, initialYear: year });

    const expectedText = `© ${year} ${holder}. All rights reserved.`;
    const copyright = screen.getByText(expectedText);
    expect(copyright).toBeVisible();
  });

  it("should display a range of dates when currentYear is greater than initialYear", () => {
    const holder = "Jane Doe";
    const initialYear = 2023;
    const currentYear = initialYear + 1;
    renderCopyright({ currentYear, holder, initialYear });

    const expectedText = `© ${initialYear}–${currentYear} ${holder}. All rights reserved.`;
    const copyright = screen.getByText(expectedText);
    expect(copyright).toBeVisible();
  });

  it("should display initialYear when currentYear is less than initialYear", () => {
    const holder = "Jean Doe";
    const initialYear = 2024;
    const currentYear = initialYear - 1;
    renderCopyright({ currentYear, holder, initialYear });

    const expectedText = `© ${initialYear} ${holder}. All rights reserved.`;
    const copyright = screen.getByText(expectedText);
    expect(copyright).toBeVisible();
  });

  it("should match the snapshot", () => {
    const result = renderCopyright();
    expect(result.container).toMatchSnapshot();
  });
});

const renderCopyright = createTestRender(Copyright, {
  currentYear: 2024,
  holder: "John Doe",
  initialYear: 2023,
});
