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
      console.log('API calls disabled, returning fallback electronic media data');
      const fallbackElectronicMedia = [
        {
          id: 1,
          title: 'Ragiji Foundation Impact Video 2024',
          titleHi: 'रागीजी फाउंडेशन प्रभाव वीडियो 2024',
          description: 'A comprehensive overview of our achievements and impact in communities.',
          descriptionHi: 'समुदायों में हमारी उपलब्धियों और प्रभाव का एक व्यापक अवलोकन।',
          mediaUrl: 'https://youtube.com/watch?v=example1',
          thumbnailUrl: '/images/placeholder.svg',
          mediaType: 'youtube',
          sourceName: 'Ragiji Foundation Official',
          publishedDate: '2024-01-15',
          views: 15000,
          likes: 1200,
          shares: 350,
          duration: '3:45',
          order: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Community Health Drive Success Story',
          titleHi: 'सामुदायिक स्वास्थ्य अभियान की सफलता की कहानी',
          description: 'Behind the scenes of our mobile health units reaching remote villages.',
          descriptionHi: 'दूरदराज के गांवों तक पहुंचने वाली हमारी मोबाइल स्वास्थ्य इकाइयों के पीछे की कहानी।',
          mediaUrl: 'https://facebook.com/post/example2',
          thumbnailUrl: '/images/placeholder.svg',
          mediaType: 'facebook',
          sourceName: 'Ragiji Foundation',
          publishedDate: '2024-01-12',
          views: 8500,
          likes: 950,
          shares: 180,
          order: 2,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      
      return NextResponse.json(fallbackElectronicMedia);
    }
    
    const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
    if (!ADMIN_API_URL) {
      throw new Error('Admin API URL not configured');
    }

    const response = await axios.get(`${ADMIN_API_URL}/api/electronic-media?locale=${locale}`, {
      headers: {
        'Accept': 'application/json'
      },
      timeout: 10000
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching electronic media:', error);
    
    // Return fallback data
    const fallbackElectronicMedia = [
      {
        id: 1,
        title: 'Foundation Impact Video',
        titleHi: 'फाउंडेशन प्रभाव वीडियो',
        description: 'See our impact in the community',
        descriptionHi: 'समुदाय में हमारा प्रभाव देखें',
        mediaUrl: '/videos/impact.mp4',
        thumbnailUrl: '/images/video-thumbnail.jpg',
        mediaType: 'video',
        sourceName: 'Ragiji Foundation',
        publishedDate: new Date().toISOString(),
        views: 5000,
        order: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    return NextResponse.json(fallbackElectronicMedia, { status: 200 });
  }
}
