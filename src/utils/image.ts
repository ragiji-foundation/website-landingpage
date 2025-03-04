export function getImageUrl(path: string): string {
  if (path.startsWith('http')) return path;
  if (path.startsWith('/')) {
    return `${process.env.NEXT_PUBLIC_ADMIN_URL}/api/${path}`;
  }
  return `${process.env.NEXT_PUBLIC_ADMIN_URL}/api/images/${path}`;
}
