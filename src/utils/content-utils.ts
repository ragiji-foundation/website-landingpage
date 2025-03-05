/**
 * Utilities for handling content from the API
 */

/**
 * Converts HTML content to plain text
 * 
 * @param html HTML string from the API
 * @returns Plain text without HTML tags
 */
export function convertFromHTML(html: string): string {
  if (!html) return '';

  // Create a temporary DOM element to strip HTML tags
  if (typeof document !== 'undefined') {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }

  // Server-side fallback with simple regex
  return html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace HTML spaces
    .replace(/&amp;/g, '&') // Replace HTML entities
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim();
}

/**
 * Safely parses JSON from a string with error handling
 * 
 * @param jsonString JSON string to parse
 * @param fallback Default value if parsing fails
 * @returns Parsed object or fallback value
 */
export function safeJsonParse<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return fallback;
  }
}

/**
 * Splits content into paragraphs
 * 
 * @param text Text content
 * @returns Array of paragraphs
 */
export function splitIntoParagraphs(text: string): string[] {
  if (!text) return [];

  // Split by double newlines or HTML paragraph breaks
  return text
    .split(/\n\s*\n|\<\/p\>\s*\<p\>/)
    .map(para => para.trim())
    .filter(Boolean);
}

/**
 * Extract bullet points from content
 * 
 * @param text Text content that might contain bullet points
 * @returns Array of bullet points
 */
export function extractBulletPoints(text: string): string[] {
  if (!text) return [];

  // Look for content that starts with bullet markers
  const lines = text.split('\n');
  return lines
    .filter(line => /^[-•*]|\d+\./.test(line.trim()))
    .map(line => line.replace(/^[-•*]|\d+\./, '').trim());
}
