import { NextRequest, NextResponse } from 'next/server';
import { transformApiJobData } from '@/utils/lexicalParser';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    const { slug } = params;
    
    const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
    if (!ADMIN_API_URL) {
      throw new Error('Admin API URL not configured');
    }

    // First try to get all careers and find the one with matching slug
    const response = await fetch(`${ADMIN_API_URL}/api/careers?locale=${locale}`, {
      headers: {
        'Accept': 'application/json'
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch careers: ${response.status}`);
    }

    const rawData = await response.json();
    
    // Define the expected API response type
    interface ApiCareerData {
      id: number;
      slug: string;
      title: string;
      titleHi?: string;
      description: string;
      descriptionHi?: string;
      requirements: string;
      requirementsHi?: string;
      location: string;
      locationHi?: string;
      type: string;
      typeHi?: string;
      isActive: boolean;
      createdAt: string;
      updatedAt: string;
      department?: string;
      salary?: string;
      applicationUrl?: string;
      closingDate?: string;
      benefits?: string;
      benefitsHi?: string;
    }
    
    // Find the job with the matching slug
    const job = (rawData as ApiCareerData[]).find(
      (career: ApiCareerData) => career.slug === slug || career.id.toString() === slug
    );
    
    if (!job) {
      return NextResponse.json(
        { error: 'Career not found' },
        { status: 404 }
      );
    }
    
    // Transform the data to match our interface
    const transformedJob = transformApiJobData(job);
    
    return NextResponse.json(transformedJob);
  } catch (error) {
    console.error('Error fetching career details:', error);
    
    // Return a minimal error response
    return NextResponse.json(
      { error: 'Failed to fetch career details' },
      { status: 500 }
    );
  }
}
