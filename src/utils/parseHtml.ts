export const parseHtml = (html: string): string => {
  // Remove HTML tags
  const strippedHtml = html.replace(/<[^>]*>/g, '');
  // Convert HTML entities
  const decoded = strippedHtml
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&bull;/g, '•');
  // Convert <br> and </li> to newlines
  return decoded.replace(/(<br>|<\/li>)/g, '\n');
};
