import type { PostContactBody } from "@/app/api/contact/route";

export default async function postContact(
  body: PostContactBody,
  fetch: Fetcher,
): Promise<PostContactResult> {
  const response = await fetch("/api/contact", {
    body: JSON.stringify(body),
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    method: "POST",
  });

  if (response.ok) {
    return { isOk: true };
  }

  if (response.status === 422) {
    return { isOk: false, validation: await response.json() };
  }

  return { isOk: false };
}

export type PostContactResult = PostContactErrorResult | PostContactOkResult;

export interface PostContactErrorResult {
  isOk: false;
  validation?: Partial<PostContactBody>;
}

export interface PostContactOkResult {
  isOk: true;
}

type Fetcher = typeof fetch;
