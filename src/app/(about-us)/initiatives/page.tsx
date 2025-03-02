'use client';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/utils/api';

interface Initiative {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  order: number;
}

export default function InitiativesPage() {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const data = await apiFetch<Initiative[]>('/initiatives');
        setInitiatives(data);
      } catch (error) {
        console.error('Failed to fetch initiatives:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitiatives();
  }, []);

  // ...rest of component

}
