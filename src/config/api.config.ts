/** Public API settings read from NEXT_PUBLIC_* environment variables (see .env.example). */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

/** Server origin without the /api suffix, used for uploaded files and WebSockets. */
export const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

export const WS_NOTIFICATIONS_URL =
  process.env.NEXT_PUBLIC_WS_URL || `${API_ORIGIN.replace(/^http/, "ws")}/ws-notifications`;

export const notificationTopic = (userId: number) => `/topic/notifications/${userId}`;
