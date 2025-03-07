// Simple analytics client

/**
 * Track a page view
 * @param path Page path
 * @param referrer Referrer URL (optional)
 */
export async function trackPageView(path: string, referrer?: string) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

    if (!API_URL) {
      console.warn('Analytics tracking disabled: API URL not configured');
      return;
    }

    // Don't track in development mode unless explicitly enabled
    if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_TRACK_DEV_ANALYTICS) {
      console.log('Analytics tracking skipped in development mode');
      return;
    }

    // Add a small delay to ensure the page has loaded
    setTimeout(async () => {
      try {
        // Send tracking data
        await fetch(`${API_URL}/api/analytics/track`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            path,
            referrer: referrer || document.referrer,
            title: document.title,
            timestamp: new Date().toISOString(),
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
            domain: window.location.hostname,
          }),
          // Use keepalive to ensure the request completes even if the page is navigating away
          keepalive: true,
          // Use no-cors mode as a fallback if regular CORS fails
          mode: 'no-cors',
        });
      } catch (innerError) {
        console.error('Failed to send analytics after delay:', innerError);
      }
    }, 300);
  } catch (error) {
    // Silently fail analytics errors so they don't break the user experience
    console.error('Analytics error:', error);
  }
}

/**
 * Track a custom event
 * @param eventName Name of the event
 * @param eventData Additional data for the event
 */
export async function trackEvent(eventName: string, eventData: Record<string, any> = {}) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

    if (!API_URL) {
      console.warn('Analytics event tracking disabled: API URL not configured');
      return;
    }

    if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_TRACK_DEV_ANALYTICS) {
      console.log(`Analytics event '${eventName}' skipped in development mode`);
      return;
    }

    await fetch(`${API_URL}/api/analytics/event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: eventName,
        data: eventData,
        path: window.location.pathname,
        timestamp: new Date().toISOString(),
      }),
      keepalive: true,
      mode: 'no-cors',
    });
  } catch (error) {
    console.error(`Analytics event '${eventName}' error:`, error);
  }
}
