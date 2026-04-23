/**
 * Centralized API configuration.
 * All components should import API_BASE_URL from here
 * instead of hardcoding URLs or reading env vars directly.
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api";
