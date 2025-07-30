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
      console.log('API calls disabled, returning fallback banner data');
      const fallbackBanners = [
        {
          id: '1',
          type: 'home',
          title: 'Welcome to Ragiji Foundation',
          titleHi: 'रागिजी फाउंडेशन में आपका स्वागत है',
          description: 'Empowering communities through education and support.',
          descriptionHi: 'शिक्षा और सहायता के माध्यम से समुदायों को सशक्त बनाना।',
          backgroundImage: '/banners/home-banner.jpg',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          type: 'centers',
          title: 'Our Centers',
          titleHi: 'हमारे केंद्र',
          description: 'Discover our network of education centers.',
          descriptionHi: 'हमारे शिक्षा केंद्रों के नेटवर्क की खोज करें।',
          backgroundImage: '/banners/centers-banner.jpg',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '3',
          type: 'awards',
          title: 'Recognition & Awards',
          titleHi: 'पहचान और पुरस्कार',
          description: 'Celebrating our achievements and milestones.',
          descriptionHi: 'हमारी उपलब्धियों और मील के पत्थर का जश्न मनाना।',
          backgroundImage: '/banners/awards-banner.jpg',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      
      return NextResponse.json(fallbackBanners);
    }
    
    const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
    if (!ADMIN_API_URL) {
      throw new Error('Admin API URL not configured');
    }

    const response = await axios.get(`${ADMIN_API_URL}/api/banners?locale=${locale}`, {
      headers: {
        'Accept': 'application/json'
      },
      timeout: 10000
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching banners:', error);
    
    // Return fallback data
    const fallbackBanners = [
      {
        id: '1',
        type: 'home',
        title: 'Welcome to Ragiji Foundation',
        titleHi: 'रागिजी फाउंडेशन में आपका स्वागत है',
        description: 'Empowering communities through education and support.',
        descriptionHi: 'शिक्षा और सहायता के माध्यम से समुदायों को सशक्त बनाना।',
        backgroundImage: '/banners/home-banner.jpg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        type: 'centers',
        title: 'Our Centers',
        titleHi: 'हमारे केंद्र',
        description: 'Discover our network of education centers.',
        descriptionHi: 'हमारे शिक्षा केंद्रों के नेटवर्क की खोज करें।',
        backgroundImage: '/banners/centers-banner.jpg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '3',
        type: 'awards',
        title: 'Recognition & Awards',
        titleHi: 'पहचान और पुरस्कार',
        description: 'Celebrating our achievements and milestones.',
        descriptionHi: 'हमारी उपलब्धियों और मील के पत्थर का जश्न मनाना।',
        backgroundImage: '/banners/awards-banner.jpg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    return NextResponse.json(fallbackBanners, { status: 200 });
  }
}
