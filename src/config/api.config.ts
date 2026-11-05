/** Public API settings read from NEXT_PUBLIC_* environment variables (see .env.example). */
/** Version prefix of every REST endpoint; matches the server's app.api-prefix. */
export const API_PREFIX = "/api/v1";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || `http://localhost:8080${API_PREFIX}`;

/** Server origin without the API prefix, used for uploaded files and WebSockets. */
export const API_ORIGIN = API_BASE_URL.replace(/\/api(\/v\d+)?\/?$/, "");

export const WS_NOTIFICATIONS_URL =
  process.env.NEXT_PUBLIC_WS_URL || `${API_ORIGIN.replace(/^http/, "ws")}/ws-notifications`;

export const notificationTopic = (userId: number) => `/topic/notifications/${userId}`;
