import { API_BASE_URL } from "@/lib/api-config";

export async function getHealthStatus() {
  const response = await fetch(`${API_BASE_URL}/health`);

  if (!response.ok) {
    throw new Error("Unable to fetch backend health status.");
  }

  return response.json();
}
