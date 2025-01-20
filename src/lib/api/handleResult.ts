export default function handleResult(method: HttpMethod, result: unknown) {
  switch (method) {
    case "POST":
      return handlePostResult(result);
  }
}

export type HttpMethod = "POST";

function handlePostResult(result: unknown) {
  if (result === undefined) {
    return new Response(null, {
      status: 204,
      statusText: "No Content",
    });
  }

  return new Response(null, {
    status: 200,
    statusText: "OK",
  });
}
