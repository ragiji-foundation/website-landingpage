import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    
    const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
    if (!ADMIN_API_URL) {
      throw new Error('Admin API URL not configured');
    }

    const response = await fetch(`${ADMIN_API_URL}/api/careers?locale=${locale}`, {
      headers: {
        'Accept': 'application/json'
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch careers: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching careers:', error);
    
    // Return fallback careers data
    const fallbackCareers = [
      {
        id: '1',
        slug: 'program-coordinator',
        title: 'Program Coordinator',
        titleHi: 'कार्यक्रम समन्वयक',
        description: 'Join our team as a Program Coordinator to help implement and oversee educational initiatives in rural communities.',
        descriptionHi: 'ग्रामीण समुदायों में शैक्षिक पहलों को लागू करने और उनकी देखरेख करने के लिए कार्यक्रम समन्वयक के रूप में हमारी टीम में शामिल हों।',
        responsibilities: `
          <ul>
            <li>Coordinate educational programs across multiple centers</li>
            <li>Train and support local teachers and volunteers</li>
            <li>Monitor program effectiveness and outcomes</li>
            <li>Develop community partnerships</li>
            <li>Report on program progress and impact</li>
          </ul>
        `,
        responsibilitiesHi: `
          <ul>
            <li>कई केंद्रों में शैक्षिक कार्यक्रमों का समन्वय करना</li>
            <li>स्थानीय शिक्षकों और स्वयंसेवकों को प्रशिक्षित करना और सहायता प्रदान करना</li>
            <li>कार्यक्रम की प्रभावशीलता और परिणामों की निगरानी करना</li>
            <li>सामुदायिक साझेदारी विकसित करना</li>
            <li>कार्यक्रम की प्रगति और प्रभाव पर रिपोर्ट करना</li>
          </ul>
        `,
        qualifications: `
          <ul>
            <li>Bachelor's degree in Education, Social Work, or related field</li>
            <li>2+ years experience in program management or education</li>
            <li>Strong communication and leadership skills</li>
            <li>Fluency in Hindi and English</li>
            <li>Willingness to travel to rural areas</li>
          </ul>
        `,
        qualificationsHi: `
          <ul>
            <li>शिक्षा, सामाजिक कार्य, या संबंधित क्षेत्र में स्नातक की डिग्री</li>
            <li>कार्यक्रम प्रबंधन या शिक्षा में 2+ वर्ष का अनुभव</li>
            <li>मजबूत संचार और नेतृत्व कौशल</li>
            <li>हिंदी और अंग्रेजी में प्रवाहता</li>
            <li>ग्रामीण क्षेत्रों की यात्रा करने की इच्छा</li>
          </ul>
        `,
        benefits: `
          <ul>
            <li>Competitive salary</li>
            <li>Health insurance</li>
            <li>Professional development opportunities</li>
            <li>Transportation allowance</li>
            <li>Meaningful work making a difference</li>
          </ul>
        `,
        benefitsHi: `
          <ul>
            <li>प्रतिस्पर्धी वेतन</li>
            <li>स्वास्थ्य बीमा</li>
            <li>व्यावसायिक विकास के अवसर</li>
            <li>परिवहन भत्ता</li>
            <li>सार्थक काम जो अंतर लाता है</li>
          </ul>
        `,
        department: 'Programs',
        location: 'Field-based with travel',
        salary: '₹25,000 - ₹35,000 per month',
        jobType: 'Full-time' as const,
        applicationUrl: 'mailto:careers@ragijifoundation.com',
        postedDate: '2024-01-15',
        closingDate: '2024-02-15',
        isActive: true
      },
      {
        id: '2',
        slug: 'volunteer-teacher',
        title: 'Volunteer Teacher',
        titleHi: 'स्वयंसेवक शिक्षक',
        description: 'Make a direct impact on children\'s lives by volunteering as a teacher in our education centers.',
        descriptionHi: 'हमारे शिक्षा केंद्रों में शिक्षक के रूप में स्वयंसेवा करके बच्चों के जीवन पर सीधा प्रभाव डालें।',
        responsibilities: `
          <ul>
            <li>Teach basic literacy and numeracy to children aged 5-15</li>
            <li>Develop age-appropriate lesson plans</li>
            <li>Support children's social and emotional development</li>
            <li>Engage with parents and community members</li>
            <li>Participate in teacher training sessions</li>
          </ul>
        `,
        responsibilitiesHi: `
          <ul>
            <li>5-15 वर्ष के बच्चों को बुनियादी साक्षरता और संख्यात्मकता सिखाना</li>
            <li>आयु-उपयुक्त पाठ योजनाएं विकसित करना</li>
            <li>बच्चों के सामाजिक और भावनात्मक विकास का समर्थन करना</li>
            <li>माता-पिता और समुदाय के सदस्यों के साथ जुड़ना</li>
            <li>शिक्षक प्रशिक्षण सत्रों में भाग लेना</li>
          </ul>
        `,
        qualifications: `
          <ul>
            <li>High school diploma or equivalent</li>
            <li>Passion for working with children</li>
            <li>Basic Hindi language skills</li>
            <li>Patience and creativity</li>
            <li>Commitment for at least 6 months</li>
          </ul>
        `,
        qualificationsHi: `
          <ul>
            <li>हाई स्कूल डिप्लोमा या समकक्ष</li>
            <li>बच्चों के साथ काम करने का जुनून</li>
            <li>बुनियादी हिंदी भाषा कौशल</li>
            <li>धैर्य और रचनात्मकता</li>
            <li>कम से कम 6 महीने की प्रतिबद्धता</li>
          </ul>
        `,
        benefits: `
          <ul>
            <li>Meaningful volunteer experience</li>
            <li>Training and mentorship</li>
            <li>Certificate of service</li>
            <li>Transportation support</li>
            <li>Community impact</li>
          </ul>
        `,
        benefitsHi: `
          <ul>
            <li>सार्थक स्वयंसेवी अनुभव</li>
            <li>प्रशिक्षण और मार्गदर्शन</li>
            <li>सेवा प्रमाणपत्र</li>
            <li>परिवहन सहायता</li>
            <li>सामुदायिक प्रभाव</li>
          </ul>
        `,
        department: 'Education',
        location: 'Various centers',
        jobType: 'Volunteer' as const,
        applicationUrl: 'mailto:volunteer@ragijifoundation.com',
        postedDate: '2024-01-01',
        isActive: true
      }
    ];
    
    return NextResponse.json(fallbackCareers, { status: 200 });
  }
}
