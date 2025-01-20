import { ZodType } from "zod";

import handleException from "./handleException";
import handleResult, { type HttpMethod } from "./handleResult";

export default function makeRoute<T, U>(
  configuration: RouteConfiguration<T, U>,
) {
  const { handleRequest, method, parseBody, schema } = configuration;

  return async function (request: Request) {
    try {
      const parsedBody = await parseBody(request);
      const validatedBody = schema.parse(parsedBody);
      const result = await handleRequest(validatedBody);
      return handleResult(method, result);
    } catch (exception: unknown) {
      return handleException(exception);
    }
  };
}

export interface RouteConfiguration<T, U> {
  handleRequest: (body: T) => Promise<U>;
  method: HttpMethod;
  parseBody: (request: Request) => unknown;
  schema: ZodType<T>;
}
