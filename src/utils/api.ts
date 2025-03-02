export async function apiFetch<T>(endpoint: string): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL;

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'omit', // Important for CORS with public API
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
}
