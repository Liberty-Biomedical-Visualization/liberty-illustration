import { describe, expect, it, jest } from "@jest/globals";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import createTestRender from "@/lib/createTestRender";

import Input from ".";

describe("Input", () => {
  it("should display a form control", () => {
    renderInput({ type: "text" });
    const result = screen.getByRole("textbox");
    expect(result).toBeVisible();
  });

  it("should display a textarea form control when type is textarea", () => {
    const { container } = renderInput({ type: "textarea" });
    const result = container.querySelector("textarea");
    expect(result).toBeInTheDocument();
  });

  it("should display a form control with label as accessible name", () => {
    const label = "Text";
    renderInput({ label, type: "text" });
    const result = screen.getByRole("textbox", { name: label });
    expect(result).toBeVisible();
  });

  it("should call onChange when form control value changes", async () => {
    const onChange = jest.fn();
    const label = "Text";
    renderInput({ label, onChange, type: "text" });

    const user = userEvent.setup();
    const input = screen.getByLabelText(label);
    await user.type(input, "Foo");

    expect(onChange).toHaveBeenCalled();
  });

  it("should display a validation message when passed validation", async () => {
    const validation = "Bad value";
    renderInput({ validation });
    const validationMessage = screen.getByText(validation);
    expect(validationMessage).toBeInTheDocument();
  });

  it("should display a validation message for a textarea when passed validation", async () => {
    const validation = "Bad value";
    renderInput({ type: "textarea", validation });
    const validationMessage = screen.getByText(validation);
    expect(validationMessage).toBeInTheDocument();
  });

  it("should pass className to the outermost element", () => {
    const className = "foo";
    const result = renderInput({ className });
    expect(result.container.firstChild).toHaveClass(className);
  });

  it("should match the snapshot", () => {
    const result = renderInput();
    expect(result.container).toMatchSnapshot();
  });
});

const renderInput = createTestRender(Input, {
  label: "Foo",
  name: "foo",
  type: "text",
});
