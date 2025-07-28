import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '10';
  
  try {
    // Check if API calls are disabled for development
    const apiDisabled = process.env.NEXT_PUBLIC_DISABLE_API === 'true';
    const useFallbacks = process.env.NEXT_PUBLIC_USE_FALLBACK_DATA === 'true';
    
    if (apiDisabled || useFallbacks) {
      console.log('API calls disabled, returning fallback blogs data');
      const fallbackBlogs = {
        blogs: [
          {
            id: 1,
            title: 'The Impact of Education on Rural Communities',
            titleHi: 'ग्रामीण समुदायों पर शिक्षा का प्रभाव',
            excerpt: 'How quality education transforms lives in rural areas.',
            excerptHi: 'गुणवत्तापूर्ण शिक्षा ग्रामीण क्षेत्रों में जीवन को कैसे बदलती है।',
            content: 'Education is the cornerstone of development...',
            contentHi: 'शिक्षा विकास की आधारशिला है...',
            slug: 'impact-education-rural-communities',
            author: 'Dr. Rajesh Kumar',
            publishedAt: new Date().toISOString(),
            featuredImage: '/images/blogs/education-impact.jpg',
            status: 'published',
            tags: ['education', 'rural', 'development']
          },
          {
            id: 2,
            title: 'Building Sustainable Communities',
            titleHi: 'टिकाऊ समुदायों का निर्माण',
            excerpt: 'Our approach to creating lasting positive change.',
            excerptHi: 'स्थायी सकारात्मक बदलाव लाने का हमारा दृष्टिकोण।',
            content: 'Sustainability is key to long-term success...',
            contentHi: 'दीर्घकालिक सफलता के लिए स्थिरता महत्वपूर्ण है...',
            slug: 'building-sustainable-communities',
            author: 'Priya Sharma',
            publishedAt: new Date().toISOString(),
            featuredImage: '/images/blogs/sustainable-communities.jpg',
            status: 'published',
            tags: ['sustainability', 'community', 'development']
          }
        ],
        pagination: {
          total: 2,
          pages: 1,
          page: parseInt(page),
          limit: parseInt(limit)
        }
      };
      
      return NextResponse.json(fallbackBlogs);
    }
    
    const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
    if (!ADMIN_API_URL) {
      throw new Error('Admin API URL not configured');
    }

    const response = await fetch(`${ADMIN_API_URL}/api/blogs?locale=${locale}&page=${page}&limit=${limit}`, {
      headers: {
        'Accept': 'application/json'
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    
    // Return fallback blogs data
    const fallbackBlogs = {
      blogs: [
        {
          id: 1,
          slug: 'empowering-education-in-rural-communities',
          locale: locale || 'en',
          title: locale === 'hi' ? 'ग्रामीण समुदायों में शिक्षा को सशक्त बनाना' : 'Empowering Education in Rural Communities',
          content: locale === 'hi' 
            ? '<p>हमारा मिशन ग्रामीण क्षेत्रों में गुणवत्तापूर्ण शिक्षा प्रदान करना है। आज हम इस बात पर चर्चा करते हैं कि कैसे हमारे कार्यक्रम समुदायों को बदल रहे हैं और बच्चों के भविष्य को उज्जवल बना रहे हैं।</p>'
            : '<p>Our mission is to provide quality education in rural areas. Today we discuss how our programs are transforming communities and brightening the future of children.</p>',
          status: 'PUBLISHED',
          authorName: 'RAGIJI Foundation Team',
          metaDescription: locale === 'hi' 
            ? 'ग्रामीण शिक्षा के लिए हमारे कार्यक्रमों और पहलों के बारे में जानें।'
            : 'Learn about our programs and initiatives for rural education.',
          authorId: 1,
          categoryId: 1,
          createdAt: '2024-01-15T00:00:00.000Z',
          updatedAt: '2024-01-15T00:00:00.000Z',
          category: {
            id: 1,
            name: locale === 'hi' ? 'शिक्षा' : 'Education'
          },
          tags: [
            {
              id: 1,
              name: locale === 'hi' ? 'शिक्षा' : 'education'
            },
            {
              id: 2,
              name: locale === 'hi' ? 'ग्रामीण' : 'rural'
            }
          ]
        },
        {
          id: 2,
          slug: 'success-stories-from-our-centers',
          locale: locale || 'en',
          title: locale === 'hi' ? 'हमारे केंद्रों की सफलता की कहानियां' : 'Success Stories from Our Centers',
          content: locale === 'hi'
            ? '<p>हमारे शिक्षा केंद्रों से आने वाली प्रेरणादायक कहानियां देखें। ये कहानियां दिखाती हैं कि कैसे हमारे छात्र अपने सपनों को साकार कर रहे हैं।</p>'
            : '<p>See inspiring stories from our education centers. These stories show how our students are achieving their dreams.</p>',
          status: 'PUBLISHED',
          authorName: 'RAGIJI Foundation Team',
          metaDescription: locale === 'hi'
            ? 'हमारे छात्रों की प्रेरणादायक सफलता की कहानियां पढ़ें।'
            : 'Read inspiring success stories of our students.',
          authorId: 1,
          categoryId: 2,
          createdAt: '2024-01-10T00:00:00.000Z',
          updatedAt: '2024-01-10T00:00:00.000Z',
          category: {
            id: 2,
            name: locale === 'hi' ? 'सफलता की कहानियां' : 'Success Stories'
          },
          tags: [
            {
              id: 3,
              name: locale === 'hi' ? 'सफलता' : 'success'
            },
            {
              id: 4,
              name: locale === 'hi' ? 'छात्र' : 'students'
            }
          ]
        }
      ],
      pagination: {
        total: 2,
        pages: 1,
        page: parseInt(page || '1'),
        limit: parseInt(limit || '10')
      }
    };
    
    return NextResponse.json(fallbackBlogs, { status: 200 });
  }
}
