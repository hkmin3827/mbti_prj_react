import axios from "axios";

type SupportedStatus = 400 | 404 | 409;

interface ApiErrorHandlers {
  400?: (message?: string) => void; // validation / 필수값 누락
  404?: (message?: string) => void; // 리소스 없음
  409?: (message?: string) => void; // 비즈니스 충돌
  default?: (message?: string) => void; // 그 외
}

export const handleApiError = (
  error: unknown,
  handlers: ApiErrorHandlers
): void => {
  if (!axios.isAxiosError(error)) return;

  const status = error.response?.status as SupportedStatus | undefined;
  const message = error.message; // interceptor에서 이미 세팅됨

  if (status && handlers[status]) {
    handlers[status]?.(message);
    return;
  }

  handlers.default?.(message);
};
