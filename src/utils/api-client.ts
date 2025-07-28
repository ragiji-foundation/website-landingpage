/**
 * Centralized API Client for Website Landing Page
 * 
 * This utility provides a consistent interface for all API calls,
 * with proper error handling, fallbacks, and environment management.
 */

// Environment configuration
const API_CONFIG = {
  ADMIN_API_URL: process.env.NEXT_PUBLIC_ADMIN_API_URL || 'https://admin.ragijifoundation.com',
  BASE_API_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  TIMEOUT: 10000, // 10 seconds
  USE_FALLBACKS: process.env.NEXT_PUBLIC_USE_FALLBACK_DATA === 'true',
  DISABLE_API: process.env.NEXT_PUBLIC_DISABLE_API === 'true',
};

interface ApiResponse<T> {
  data: T;
  error: Error | null;
  fromFallback: boolean;
}

interface ApiClientOptions {
  timeout?: number;
  locale?: string;
  useProxy?: boolean;
}

class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_CONFIG.ADMIN_API_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  /**
   * Generic fetch method with error handling and fallbacks
   */
  private async fetch<T>(
    endpoint: string, 
    options: RequestInit & ApiClientOptions = {},
    fallbackData?: T
  ): Promise<ApiResponse<T>> {
    const { timeout = this.timeout, locale = 'en', useProxy = true, ...fetchOptions } = options;

    // If API is disabled, return fallback immediately
    if (API_CONFIG.DISABLE_API && fallbackData !== undefined) {
      console.log(`API disabled - using fallback for ${endpoint}`);
      return { data: fallbackData, error: null, fromFallback: true };
    }

    try {
      // Determine the URL to use
      let url: string;
      if (useProxy && typeof window !== 'undefined') {
        // Use proxy route when calling from client-side
        url = `${window.location.origin}/api${endpoint}`;
      } else {
        // Direct admin API call (server-side)
        url = `${this.baseURL}${endpoint}`;
      }

      // Add locale parameter
      const urlObj = new URL(url);
      if (locale) {
        urlObj.searchParams.set('locale', locale);
      }

      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(urlObj.toString(), {
        ...fetchOptions,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...fetchOptions.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return { data, error: null, fromFallback: false };

    } catch (error) {
      console.error(`API error for ${endpoint}:`, error);
      
      if (fallbackData !== undefined) {
        console.log(`Using fallback data for ${endpoint}`);
        return { 
          data: fallbackData, 
          error: error instanceof Error ? error : new Error(String(error)),
          fromFallback: true 
        };
      }

      return {
        data: undefined as unknown as T,
        error: error instanceof Error ? error : new Error(String(error)),
        fromFallback: false
      };
    }
  }

  // Public API methods
  async get<T>(endpoint: string, fallbackData?: T, options: ApiClientOptions = {}): Promise<ApiResponse<T>> {
    return this.fetch<T>(endpoint, { method: 'GET', ...options }, fallbackData);
  }

  async post<T>(endpoint: string, data: unknown, options: ApiClientOptions = {}): Promise<ApiResponse<T>> {
    return this.fetch<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options
    });
  }

  async put<T>(endpoint: string, data: unknown, options: ApiClientOptions = {}): Promise<ApiResponse<T>> {
    return this.fetch<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options
    });
  }

  async delete<T>(endpoint: string, options: ApiClientOptions = {}): Promise<ApiResponse<T>> {
    return this.fetch<T>(endpoint, { method: 'DELETE', ...options });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export configuration for debugging
export const config = API_CONFIG;

// Utility function for safe API calls with fallbacks
export async function safeApiCall<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  fallbackData: T,
  resourceName?: string
): Promise<T> {
  try {
    const result = await apiCall();
    if (result.error && result.fromFallback) {
      console.warn(`API call failed for ${resourceName || 'unknown resource'}, using fallback:`, result.error);
    }
    return result.data;
  } catch (error) {
    console.error(`Critical API error for ${resourceName || 'unknown resource'}:`, error);
    return fallbackData;
  }
}
