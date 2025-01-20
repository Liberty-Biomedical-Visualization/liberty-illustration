import { z } from "zod";

import { makeRoute, parseJsonBody, sendContactEmail } from "@/lib/api";
import sendEmail from "@/lib/sendEmail";

const postContactSchema = z.object({
  email: z.string().trim().email(),
  message: z.string().trim().min(1, { message: "Required" }),
  subject: z.string().trim().min(1, { message: "Required" }),
});

export const POST = makeRoute({
  handleRequest: (body) => sendContactEmail(body, sendEmail),
  method: "POST",
  parseBody: parseJsonBody,
  schema: postContactSchema,
});

export type PostContactBody = z.infer<typeof postContactSchema>;
