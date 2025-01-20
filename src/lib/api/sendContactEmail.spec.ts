import { describe, expect, it, jest } from "@jest/globals";

import config from "@/lib/config";

import sendContactEmail from "./sendContactEmail";

describe("sendContactEmail", () => {
  it("should call sendEmail with formatted contact Email", async () => {
    const fields = {
      email: "foo@bar.com",
      message: "This is a test message; please ignore.",
      subject: "Test message, please ignore",
    };
    const sendEmail = jest.fn(() => Promise.resolve());

    await sendContactEmail(fields, sendEmail);

    expect(sendEmail).toHaveBeenCalledWith({
      from: {
        email: config.CONTACT_SENDER_EMAIL,
        name: config.CONTACT_SENDER_NAME,
      },
      subject: "Contact",
      text:
        `Email:\n${fields.email}\n\n` +
        `Subject:\n${fields.subject}\n\n` +
        `Message:\n${fields.message}`,
      to: config.CONTACT_RECIPIENT_EMAIL,
    });
  });
});
