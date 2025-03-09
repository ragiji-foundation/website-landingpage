import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';

// Base URL for API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Generic fetcher function
const fetcher = async (url: string) => {
  const response = await fetch(url.startsWith('http') ? url : `${API_BASE_URL}${url}`);
  if (!response.ok) {
    throw new Error(`Network error: ${response.status}`);
  }
  return response.json();
};

// POST request helper
const poster = async (url: string, data: any) => {
  const response = await fetch(url.startsWith('http') ? url : `${API_BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error(`Network error: ${response.status}`);
  }
  return response.json();
};

// Generic data hook with caching
export function useData<T = any>(endpoint: string, queryKey: string | string[]) {
  const key = Array.isArray(queryKey) ? queryKey : [queryKey];

  return useQuery<T>({
    queryKey: key,
    queryFn: () => fetcher(endpoint),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
}

// API endpoint hooks
export function useInitiatives() {
  return useData('/initiatives', 'initiatives');
}

export function useStats() {
  return useData('/stats', 'stats');
}



export function useTestimonials() {
  return useData('/testimonials', 'testimonials');
}

export function useFeaturedProjects() {
  return useData('s/features',  'features');
}

// Contact form submission
export function useContactForm() {
  return useMutation({
    mutationFn: (formData: any) => poster('/contactus', formData),
  });
}

// Newsletter subscription
export function useNewsletterSubscription() {
  return useMutation({
    mutationFn: (email: string) => poster('/subscribe', { email }),
  });
}

// Prefetch important data for performance
export const prefetchImportantData = async (queryClient: QueryClient) => {
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['initiatives'],
      queryFn: () => fetcher('/initiatives'),
    }),
    queryClient.prefetchQuery({
      queryKey: ['stats'],
      queryFn: () => fetcher('/stats'),
    }),
    queryClient.prefetchQuery({
      queryKey: ['testimonials'],
      queryFn: () => fetcher('/testimonials'),
    }),
    queryClient.prefetchQuery({
      queryKey: ['features'],
      queryFn: () => fetcher('/features'),
    }), 
    
  ]);
};