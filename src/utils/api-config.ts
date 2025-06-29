/**
 * API configuration and utility functions
 * 
 * This utility helps manage API endpoints and fallback behavior
 * across the application.
 */

// Base API configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.ragijifoundation.com';
export const USE_FALLBACKS = process.env.NEXT_PUBLIC_USE_FALLBACK_DATA === 'false';
export const DISABLE_API = process.env.NEXT_PUBLIC_DISABLE_API === 'false';

// Determine if we're in development mode
export const isDevelopment = process.env.NODE_ENV === 'development';

// Default API request timeout in milliseconds
export const DEFAULT_TIMEOUT = 8000;

interface FetchOptions extends RequestInit {
  timeout?: number;
}

interface SafeFetchResult<T> {
  data: T;
  error: Error | null;
  fromFallback: boolean;
}

// Should we use fallbacks?
export const shouldUseFallbacks = () => {
  return DISABLE_API || USE_FALLBACKS;
};

// Utility to log fallback usage
export const logFallbackUsage = (resource: string) => {
  console.log(`Using fallback data for ${resource} (API disabled or fallback forced)`);
};

/**
 * Safely fetches data from the API with fallback support
 * @param url - The API endpoint to fetch from
 * @param fallbackData - Data to use if the API request fails
 * @param options - Fetch options
 * @returns The API data or fallback data, along with error information
 */
export async function safeFetch<T>(
  url: string,
  fallbackData: T,
  options: FetchOptions = {}
): Promise<SafeFetchResult<T>> {
  // If API calls are disabled or we're explicitly using fallbacks, return fallback data
  if (DISABLE_API || USE_FALLBACKS) {
    console.log(`API call to ${url} skipped - using fallback data`);
    return {
      data: fallbackData,
      error: null,
      fromFallback: true
    };
  }
  
  // Set default options
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers
    },
    ...options
  };
  
  // Add timeout to the fetch request
  const timeout = options.timeout || DEFAULT_TIMEOUT; // Default timeout
  
  try {
    // Check if URL is relative and prefix with API base URL if needed
    const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
    
    // Create a promise that rejects after the timeout
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error(`Request to ${url} timed out after ${timeout}ms`)), timeout);
    });
    
    // Race the fetch against the timeout
    const response = await Promise.race([
      fetch(fullUrl, fetchOptions),
      timeoutPromise
    ]) as Response;
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return {
      data,
      error: null,
      fromFallback: false
    };
  } catch (error) {
    console.warn(`API error for ${url}:`, error);
    
    return {
      data: fallbackData,
      error: error instanceof Error ? error : new Error(String(error)),
      fromFallback: true
    };
  }
}