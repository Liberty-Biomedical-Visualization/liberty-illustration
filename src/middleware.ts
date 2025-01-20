import { type NextRequest, NextResponse } from "next/server";

import { handleException, negotiateContent } from "@/lib/middleware";

export function middleware(request: NextRequest) {
  try {
    negotiateContent(request);
    return NextResponse.next();
  } catch (exception: unknown) {
    return handleException(exception);
  }
}

export const config = {
  matcher: "/api/(.*)",
};
