import { NextResponse } from 'next/server';

// This is a simple example - replace with your actual search implementation
const searchableContent = [
  { title: 'The Need', url: '/the-need', content: 'Content about the need...' },
  { title: 'Our Story', url: '/our-story', content: 'Content about our story...' },
  // Add more searchable content
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';

  const results = searchableContent.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.content.toLowerCase().includes(query)
  );

  return NextResponse.json(results);
} 