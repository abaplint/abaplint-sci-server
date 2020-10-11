export interface ApiResponseStatus {
  success: number;
}

export interface ApiResponseSuccess<Payload> extends ApiResponseStatus {
  payload: Payload;
}

export interface ApiResponseError extends ApiResponseStatus {
  error: {
    message: string;
    // TODO details
  };
}

export function createErrorResponse(message: string): ApiResponseError {
  return {
    success: 0,
    error: { message }
  };
}

export function createSuccessStringResponse(payload: string): ApiResponseSuccess<string> {
  return {
    success: 1,
    payload,
  };
}

export function createSuccessResponse<T>(payload: T): ApiResponseSuccess<T> {
  return {
    success: 1,
    payload,
  };
}

export function createSuccessResponseAny(payload: unknown): ApiResponseSuccess<unknown> {
  return {
    success: 1,
    payload,
  };
}
