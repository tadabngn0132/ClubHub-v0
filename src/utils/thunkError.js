export const getThunkErrorPayload = (
  error,
  fallbackMessage = "Request failed",
) => ({
  success: false,
  message: error?.response?.data?.message || error?.message || fallbackMessage,
  data: error?.response?.data?.data ?? null,
  statusCode:
    error?.response?.data?.statusCode ?? error?.response?.status ?? null,
});
