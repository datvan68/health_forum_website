import { API_BASE_URL } from "@/lib/api-config";

export function useSiteConfig() {
  return {
    siteName: "Health Forum",
    apiBaseUrl: API_BASE_URL,
  };
}
