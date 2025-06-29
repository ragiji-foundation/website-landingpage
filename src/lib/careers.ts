/**
 * API functions for Careers
 */

// Get a single career by slug
export async function getCareer(slug: string, locale: string = 'en') {
  try {
    // Make sure we're using the correct API URL - direct to admin backend
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://admin.ragijifoundation.com';
    // Always pass the locale as a query parameter, even if the API might not use it directly
    const careerUrl = `${apiUrl}/api/careers/${slug}?locale=${locale}`;
    
    console.log(`Fetching career from: ${careerUrl}`);
    
    const response = await fetch(careerUrl, { 
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch career');
    }
    
    // Check if we got JSON back
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error(`Expected JSON but got ${contentType}`);
      return null;
    }
    
    // Get the data and return the appropriate localized version
    const career = await response.json();
    
    // Log what we received for debugging
    console.log(`Career API response for locale ${locale}:`, {
      title: career.title,
      titleHi: career.titleHi,
      hasDescription: !!career.description,
      hasHindiDescription: !!career.descriptionHi,
    });
    
    // IMPORTANT: Don't modify the structure of the response
    // Let the component handle which fields to display
    return career;
  } catch (error) {
    console.error('Error fetching career:', error);
    return null;
  }
}

// Get all careers
export async function getCareers(locale: string = 'en') {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://admin.ragijifoundation.com';
    // Always pass the locale as a query parameter
    const careersUrl = `${apiUrl}/api/careers?locale=${locale}`;
    
    console.log(`Fetching careers from: ${careersUrl}`);
    
    const response = await fetch(careersUrl, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch careers');
    }
    
    // Check if we got JSON back
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error(`Expected JSON but got ${contentType}`);
      return [];
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching careers:', error);
    return [];
  }
}