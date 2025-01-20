import { describe, expect, it, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  AppRouterContext,
  type AppRouterInstance,
} from "next/dist/shared/lib/app-router-context.shared-runtime";

import ContactForm, { type ContactFormProps } from ".";

describe("ContactForm", () => {
  // fetch is not globally available in the test environment, but it is passed
  // to postContact as a dependency.
  global.fetch = () => Promise.resolve(new Response());

  it("should display an Email field", () => {
    renderContactForm();
    const result = screen.getByLabelText("Email");
    expect(result).toBeInTheDocument();
  });

  it("should display a Subject field", () => {
    renderContactForm();
    const result = screen.getByLabelText("Subject");
    expect(result).toBeInTheDocument();
  });

  it("should display a Message field", () => {
    renderContactForm();
    const result = screen.getByLabelText("Message");
    expect(result).toBeInTheDocument();
  });

  it("should call postContact with field values when form is submitted", async () => {
    const email = "foo@bar.com";
    const subject = "Test Subject";
    const message = "Test message, please ignore.";
    const postContact = jest.fn(() => Promise.resolve({ isOk: true }));
    renderContactForm({ postContact });

    const user = userEvent.setup();
    const emailField = screen.getByLabelText("Email");
    await user.type(emailField, email);
    const subjectField = screen.getByLabelText("Subject");
    await user.type(subjectField, subject);
    const messageField = screen.getByLabelText("Message");
    await user.type(messageField, message);
    const submitButton = screen.getByRole("button", { name: "Submit" });
    await user.click(submitButton);

    expect(postContact).toHaveBeenCalledWith(
      { email, subject, message },
      fetch,
    );
  });

  it("should redirect to the contact success page when postContact result is OK", async () => {
    const router = createMockRouter();
    const postContact = () => Promise.resolve({ isOk: true });
    renderContactForm({ postContact }, router);

    await fillAndSubmitContactForm();

    expect(router.push).toHaveBeenCalledWith("/contact/success");
  });

  it("should display validation errors when postContact result contains validation", async () => {
    const emailValidation = "Ridiculous";
    const messageValidation = "Silly";
    const subjectValidaiton = "Outrageous";
    const postContact = () =>
      Promise.resolve({
        isOk: false,
        validation: {
          email: emailValidation,
          message: messageValidation,
          subject: subjectValidaiton,
        },
      });
    renderContactForm({ postContact });

    await fillAndSubmitContactForm();

    const emailField = screen.getByLabelText("Email");
    expect(emailField).toHaveAccessibleDescription(emailValidation);
    const messageField = screen.getByLabelText("Message");
    expect(messageField).toHaveAccessibleDescription(messageValidation);
    const subjectField = screen.getByLabelText("Subject");
    expect(subjectField).toHaveAccessibleDescription(subjectValidaiton);
  });

  it("should not redirect when postContact result is not OK", async () => {
    const router = createMockRouter();
    const postContact = () => Promise.resolve({ isOk: false });
    renderContactForm({ postContact }, router);

    await fillAndSubmitContactForm();

    expect(router.push).not.toHaveBeenCalled();
  });

  it("should display an error message when postContact result is not OK and does not contain validation", async () => {
    const postContact = () => Promise.resolve({ isOk: false });
    renderContactForm({ postContact });

    await fillAndSubmitContactForm();

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Oops! Something went wrong.");
  });

  it("should not redirect when the server returns a 500 response", () => {});

  it("should match the snapshot", () => {
    const result = renderContactForm();
    expect(result.container).toMatchSnapshot();
  });
});

function createMockRouter(): AppRouterInstance {
  return {
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
    push: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
  };
}

async function fillAndSubmitContactForm() {
  const user = userEvent.setup();
  const emailField = screen.getByLabelText("Email");
  await user.type(emailField, "foo@bar.com");
  const subjectField = screen.getByLabelText("Subject");
  await user.type(subjectField, "Test Subject");
  const messageField = screen.getByLabelText("Message");
  await user.type(messageField, "Test message, please ignore.");
  const submitButton = screen.getByRole("button", { name: "Submit" });
  await user.click(submitButton);
}

function renderContactForm(
  props?: Partial<Readonly<ContactFormProps>>,
  router: AppRouterInstance = createMockRouter(),
) {
  const resolvedProps = {
    postContact: () => Promise.resolve({ isOk: true }),
    ...props,
  };

  return render(
    <AppRouterContext.Provider value={router}>
      <ContactForm {...resolvedProps} />
    </AppRouterContext.Provider>,
  );
}
