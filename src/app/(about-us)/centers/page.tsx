'use client';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/utils/api';

interface Center {
  id: number;
  name: string;
  location: string;
  description: string;
  imageUrl?: string;
  contactInfo?: string;
}

export default function CentersPage() {
  const [centers, setCenters] = useState<Center[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const data = await apiFetch<Center[]>('/centers');
        setCenters(data);
      } catch (error) {
        console.error('Failed to fetch centers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCenters();
  }, []);

  // ...rest of component

  return (
    <div>
      <h1>Centers</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {centers.map(center => (
            <li key={center.id}>
              <h2>{center.name}</h2>
              <p>{center.location}</p>
              <p>{center.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
