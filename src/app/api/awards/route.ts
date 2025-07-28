import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    
    // Check if API calls are disabled for development
    const apiDisabled = process.env.NEXT_PUBLIC_DISABLE_API === 'true';
    const useFallbacks = process.env.NEXT_PUBLIC_USE_FALLBACK_DATA === 'true';
    
    if (apiDisabled || useFallbacks) {
      console.log('API calls disabled, returning fallback awards data');
      const fallbackAwards = [
        {
          id: '1',
          title: 'Excellence in Education Award',
          titleHi: 'शिक्षा में उत्कृष्टता पुरस्कार',
          description: 'Recognition for outstanding contribution to education.',
          descriptionHi: 'शिक्षा में उत्कृष्ट योगदान के लिए मान्यता।',
          year: '2023',
          awardedBy: 'Ministry of Education',
          awardedByHi: 'शिक्षा मंत्रालय',
          imageUrl: '/images/awards/education-award.jpg',
          category: 'education'
        },
        {
          id: '2',
          title: 'Community Service Award',
          titleHi: 'सामुदायिक सेवा पुरस्कार',
          description: 'For dedicated service to rural communities.',
          descriptionHi: 'ग्रामीण समुदायों की समर्पित सेवा के लिए।',
          year: '2022',
          awardedBy: 'State Government',
          awardedByHi: 'राज्य सरकार',
          imageUrl: '/images/awards/community-award.jpg',
          category: 'community'
        }
      ];
      
      return NextResponse.json(fallbackAwards);
    }
    
    const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
    if (!ADMIN_API_URL) {
      throw new Error('Admin API URL not configured');
    }

    const response = await axios.get(`${ADMIN_API_URL}/api/awards?locale=${locale}`, {
      headers: {
        'Accept': 'application/json'
      },
      timeout: 10000
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching awards:', error);
    
    // Return fallback data
    const fallbackAwards = [
      {
        id: '1',
        title: 'Excellence in Education Award',
        titleHi: 'शिक्षा में उत्कृष्टता पुरस्कार',
        year: '2023',
        description: 'Recognized for outstanding contribution to education.',
        descriptionHi: 'शिक्षा में उत्कृष्ट योगदान के लिए मान्यता प्राप्त।',
        imageUrl: '/images/award1.jpg',
        organization: 'Ministry of Education',
        organizationHi: 'शिक्षा मंत्रालय',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    return NextResponse.json(fallbackAwards, { status: 200 });
  }
}
