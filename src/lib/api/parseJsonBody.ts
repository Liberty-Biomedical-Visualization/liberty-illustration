export default async function parseJsonBody(request: Request) {
  const contentType = request.headers.get("Content-Type");

  if (contentType !== "application/json") {
    throw new ParseJsonBodyError(
      `Content-Type ${contentType} is not supported. Expected application/json.`,
    );
  }

  try {
    return await request.json();
  } catch (exception) {
    throw new ParseJsonBodyError("Failed to parse request body.", {
      cause: exception,
    });
  }
}

export class ParseJsonBodyError extends Error {}
