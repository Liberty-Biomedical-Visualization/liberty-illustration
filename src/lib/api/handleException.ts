import { ZodError } from "zod";

import { ParseJsonBodyError } from "./parseJsonBody";

export default function handleException(exception: unknown) {
  if (exception instanceof ParseJsonBodyError) {
    return new Response(null, {
      headers: {
        "Accept-Post": "application/json",
        "Content-Type": "text/plain",
      },
      status: 415,
      statusText: "Unsupported Media Type",
    });
  }

  if (exception instanceof ZodError) {
    return handleZodError(exception);
  }

  return new Response(null, {
    status: 500,
    statusText: "Internal Server Error",
  });
}

function handleZodError(error: ZodError) {
  const fieldErrorEntries = Object.entries(error.flatten().fieldErrors);

  const joinedValueEntries = fieldErrorEntries.map(
    ([key, value]) => [key, value?.join("; ")] as const,
  );

  const data = Object.fromEntries(joinedValueEntries);

  return Response.json(data, {
    status: 422,
    statusText: "Unprocessable Content",
  });
}
