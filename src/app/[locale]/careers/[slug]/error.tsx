'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Career page error:', error);
  }, [error]);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
        <p className="text-xl mb-8">
          {error.message || 'Failed to load career details'}
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
            className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
          >
            Try again
          </button>
          <Link
            href="/careers"
            className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
          >
            Back to Careers
          </Link>
        </div>
      </div>
    </div>
  );
}