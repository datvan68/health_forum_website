import { API_BASE_URL } from "@/lib/api-config";

export interface ProfileUpdateData {
  fullName: string;
  title: string;
  siteTitle: string;
  bio?: string | null;
  location?: string | null;
  researchArea?: string | null;
  highestDegree?: string | null;
  organization?: string | null;
}

export async function getProfile(id: string) {
  const response = await fetch(`${API_BASE_URL}/profile/${id}`);
  if (!response.ok) throw new Error("Failed to fetch profile");
  return response.json();
}

export async function updateProfile(id: string, data: ProfileUpdateData) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_BASE_URL}/profile/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update profile");
  }

  return response.json();
}
