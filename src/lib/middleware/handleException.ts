import { ContentNegotiationError } from "./negotiateContent";

export default function handleException(exception: unknown) {
  if (exception instanceof ContentNegotiationError) {
    return new Response(exception.clientMessage, {
      headers: { "Content-Type": "text/plain" },
      status: 406,
      statusText: "Not Acceptable",
    });
  }

  return new Response(null, {
    status: 500,
    statusText: "Internal Server Error",
  });
}
