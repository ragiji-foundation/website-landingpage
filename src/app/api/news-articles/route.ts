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
      console.log('API calls disabled, returning fallback news articles data');
      const fallbackNews = [
        {
          id: 1,
          title: 'Foundation Launches New Education Initiative',
          titleHi: 'फाउंडेशन ने नई शिक्षा पहल शुरू की',
          description: 'A comprehensive program to improve rural education access.',
          descriptionHi: 'ग्रामीण शिक्षा पहुंच में सुधार के लिए एक व्यापक कार्यक्रम।',
          content: 'Detailed content about the education initiative...',
          contentHi: 'शिक्षा पहल के बारे में विस्तृत सामग्री...',
          date: new Date().toISOString(),
          imageUrl: '/images/news/education-initiative.jpg',
          slug: 'foundation-launches-new-education-initiative',
          category: 'education'
        },
        {
          id: 2,
          title: 'Community Center Opens in Rural Area',
          titleHi: 'ग्रामीण क्षेत्र में सामुदायिक केंद्र खुला',
          description: 'New facility provides essential services to underserved communities.',
          descriptionHi: 'नई सुविधा वंचित समुदायों को आवश्यक सेवाएं प्रदान करती है।',
          content: 'Detailed content about the community center...',
          contentHi: 'सामुदायिक केंद्र के बारे में विस्तृत सामग्री...',
          date: new Date().toISOString(),
          imageUrl: '/images/news/community-center.jpg',
          slug: 'community-center-opens-rural-area',
          category: 'community'
        }
      ];
      
      return NextResponse.json(fallbackNews);
    }
    
    const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
    if (!ADMIN_API_URL) {
      throw new Error('Admin API URL not configured');
    }

    const response = await axios.get(`${ADMIN_API_URL}/api/news-articles?locale=${locale}`, {
      headers: {
        'Accept': 'application/json'
      },
      timeout: 10000
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching news articles:', error);
    
    // Return fallback data
    const fallbackNews = [
      {
        id: 1,
        title: 'Foundation Launches New Education Initiative',
        titleHi: 'फाउंडेशन ने नई शिक्षा पहल शुरू की',
        source: 'Ragiji Foundation News',
        sourceHi: 'रागी जी फाउंडेशन समाचार',
        date: new Date().toISOString(),
        imageUrl: '/images/news1.jpg',
        link: '#',
        description: 'A new education initiative has been launched to help more children.',
        descriptionHi: 'अधिक बच्चों की मदद के लिए एक नई शिक्षा पहल शुरू की गई है।'
      }
    ];

    return NextResponse.json(fallbackNews, { status: 200 });
  }
}
