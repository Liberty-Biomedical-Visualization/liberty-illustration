export default function negotiateContent(request: Request) {
  const accept = request.headers.get("Accept");

  if (accept === null) {
    throw new ContentNegotiationError(
      "Accept header is missing.",
      "Accept header is missing.",
    );
  }

  if (
    !(
      accept.includes("*/*") ||
      accept.includes("application/*") ||
      accept.includes("application/json")
    )
  ) {
    throw new ContentNegotiationError(
      `Accept header is ${accept}`,
      "Only application/json is supported.",
    );
  }
}

export class ContentNegotiationError extends Error {
  constructor(message: string, clientMessage: string) {
    super(message);
    this.clientMessage = clientMessage;
  }

  readonly clientMessage: string;
}
