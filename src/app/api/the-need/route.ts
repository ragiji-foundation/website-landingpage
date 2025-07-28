import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    
    // Check if API calls are disabled for development
    const isApiDisabled = process.env.NEXT_PUBLIC_DISABLE_API === 'true';
    const useFallbackData = process.env.NEXT_PUBLIC_USE_FALLBACK_DATA === 'true';
    
    if (isApiDisabled || useFallbackData) {
      console.log('API calls disabled, returning fallback the-need data');
      
      const fallbackData = {
        id: '1',
        title: 'The Need',
        titleHi: 'ज़रूरत',
        mainText: `
          <p>At RAGIJI Foundation, our mission is driven by the urgent need to address educational disparities in underserved communities. Millions of children in rural and urban slum areas lack access to quality education, perpetuating a cycle of poverty and limited opportunity.</p>
          <p>We exist to bridge this gap by providing accessible, quality education to children who would otherwise be left behind. Our approach combines modern teaching methods with traditional values, creating a supportive environment where every child can thrive.</p>
        `,
        mainTextHi: `
          <p>रागिजी फाउंडेशन में, हमारा मिशन वंचित समुदायों में शैक्षिक असमानताओं को दूर करने की तत्काल आवश्यकता से प्रेरित है। ग्रामीण और शहरी झुग्गी क्षेत्रों में लाखों बच्चों को गुणवत्तापूर्ण शिक्षा तक पहुंच नहीं है, जिससे गरीबी और सीमित अवसर का एक चक्र बना रहता है।</p>
          <p>हम उन बच्चों को सुलभ, गुणवत्तापूर्ण शिक्षा प्रदान करके इस अंतर को पाटने के लिए मौजूद हैं, जो अन्यथा पीछे छूट जाएंगे। हमारा दृष्टिकोण आधुनिक शिक्षण पद्धतियों को पारंपरिक मूल्यों के साथ जोड़ता है, जिससे एक सहायक वातावरण बनता है जहां हर बच्चा फल-फूल सकता है।</p>
        `,
        statistics: `
          <ul>
            <li>Over 30% of children in underserved communities lack access to basic education</li>
            <li>Only 1 in 5 children from economically disadvantaged backgrounds completes secondary education</li>
            <li>63% of rural schools lack adequate infrastructure and teaching resources</li>
            <li>Girls are 1.5 times more likely to be out of school than boys in the communities we serve</li>
          </ul>
        `,
        statisticsHi: `
          <ul>
            <li>वंचित समुदायों में 30% से अधिक बच्चों को बुनियादी शिक्षा तक पहुंच नहीं है</li>
            <li>आर्थिक रूप से वंचित पृष्ठभूमि के केवल 5 में से 1 बच्चे माध्यमिक शिक्षा पूरी करते हैं</li>
            <li>63% ग्रामीण स्कूलों में पर्याप्त बुनियादी ढांचे और शिक्षण संसाधनों का अभाव है</li>
            <li>हमारे सेवा करने वाले समुदायों में लड़कियों के स्कूल से बाहर होने की संभावना लड़कों से 1.5 गुना अधिक है</li>
          </ul>
        `,
        impact: `
          <p>Since our founding, RAGIJI Foundation has made significant progress in addressing these challenges:</p>
          <ul>
            <li>Established 15 education centers reaching over 1,500 children annually</li>
            <li>Achieved a 95% school retention rate among children in our programs</li>
            <li>Provided supplementary nutrition and healthcare to over 800 children</li>
            <li>Trained 100+ community volunteers to support educational initiatives</li>
          </ul>
          <p>But there is still much work to be done. With your support, we can reach more children and create lasting change in communities across the region.</p>
        `,
        impactHi: `
          <p>अपनी स्थापना के बाद से, रागिजी फाउंडेशन ने इन चुनौतियों का समाधान करने में महत्वपूर्ण प्रगति की है:</p>
          <ul>
            <li>15 शिक्षा केंद्र स्थापित किए जो सालाना 1,500 से अधिक बच्चों तक पहुंचते हैं</li>
            <li>हमारे कार्यक्रमों में बच्चों के बीच 95% स्कूल प्रतिधारण दर हासिल की</li>
            <li>800 से अधिक बच्चों को पूरक पोषण और स्वास्थ्य देखभाल प्रदान की</li>
            <li>शैक्षिक पहलों का समर्थन करने के लिए 100+ सामुदायिक स्वयंसेवकों को प्रशिक्षित किया</li>
          </ul>
          <p>लेकिन अभी भी बहुत काम बाकी है। आपके समर्थन से, हम और अधिक बच्चों तक पहुंच सकते हैं और पूरे क्षेत्र में समुदायों में स्थायी परिवर्तन ला सकते हैं।</p>
        `,
        imageUrl: '/images/the-need.svg',
        statsImageUrl: '/images/statistics-chart.svg'
      };
      
      return NextResponse.json(fallbackData, { status: 200 });
    }
    
    const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
    if (!ADMIN_API_URL) {
      throw new Error('Admin API URL not configured');
    }

    const response = await fetch(`${ADMIN_API_URL}/api/the-need?locale=${locale}`, {
      headers: {
        'Accept': 'application/json'
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch the-need data: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching the-need data:', error);
    
    // Return fallback data
    const fallbackData = {
      id: '1',
      title: 'The Need',
      titleHi: 'ज़रूरत',
      mainText: `
        <p>At RAGIJI Foundation, our mission is driven by the urgent need to address educational disparities in underserved communities. Millions of children in rural and urban slum areas lack access to quality education, perpetuating a cycle of poverty and limited opportunity.</p>
        <p>We exist to bridge this gap by providing accessible, quality education to children who would otherwise be left behind. Our approach combines modern teaching methods with traditional values, creating a supportive environment where every child can thrive.</p>
      `,
      mainTextHi: `
        <p>रागिजी फाउंडेशन में, हमारा मिशन वंचित समुदायों में शैक्षिक असमानताओं को दूर करने की तत्काल आवश्यकता से प्रेरित है। ग्रामीण और शहरी झुग्गी क्षेत्रों में लाखों बच्चों को गुणवत्तापूर्ण शिक्षा तक पहुंच नहीं है, जिससे गरीबी और सीमित अवसर का एक चक्र बना रहता है।</p>
        <p>हम उन बच्चों को सुलभ, गुणवत्तापूर्ण शिक्षा प्रदान करके इस अंतर को पाटने के लिए मौजूद हैं, जो अन्यथा पीछे छूट जाएंगे। हमारा दृष्टिकोण आधुनिक शिक्षण पद्धतियों को पारंपरिक मूल्यों के साथ जोड़ता है, जिससे एक सहायक वातावरण बनता है जहां हर बच्चा फल-फूल सकता है।</p>
      `,
      statistics: `
        <ul>
          <li>Over 30% of children in underserved communities lack access to basic education</li>
          <li>Only 1 in 5 children from economically disadvantaged backgrounds completes secondary education</li>
          <li>63% of rural schools lack adequate infrastructure and teaching resources</li>
          <li>Girls are 1.5 times more likely to be out of school than boys in the communities we serve</li>
        </ul>
      `,
      statisticsHi: `
        <ul>
          <li>वंचित समुदायों में 30% से अधिक बच्चों को बुनियादी शिक्षा तक पहुंच नहीं है</li>
          <li>आर्थिक रूप से वंचित पृष्ठभूमि के केवल 5 में से 1 बच्चे माध्यमिक शिक्षा पूरी करते हैं</li>
          <li>63% ग्रामीण स्कूलों में पर्याप्त बुनियादी ढांचे और शिक्षण संसाधनों का अभाव है</li>
          <li>हमारे सेवा करने वाले समुदायों में लड़कियों के स्कूल से बाहर होने की संभावना लड़कों से 1.5 गुना अधिक है</li>
        </ul>
      `,
      impact: `
        <p>Since our founding, RAGIJI Foundation has made significant progress in addressing these challenges:</p>
        <ul>
          <li>Established 15 education centers reaching over 1,500 children annually</li>
          <li>Achieved a 95% school retention rate among children in our programs</li>
          <li>Provided supplementary nutrition and healthcare to over 800 children</li>
          <li>Trained 100+ community volunteers to support educational initiatives</li>
        </ul>
        <p>But there is still much work to be done. With your support, we can reach more children and create lasting change in communities across the region.</p>
      `,
      impactHi: `
        <p>अपनी स्थापना के बाद से, रागिजी फाउंडेशन ने इन चुनौतियों का समाधान करने में महत्वपूर्ण प्रगति की है:</p>
        <ul>
          <li>15 शिक्षा केंद्र स्थापित किए जो सालाना 1,500 से अधिक बच्चों तक पहुंचते हैं</li>
          <li>हमारे कार्यक्रमों में बच्चों के बीच 95% स्कूल प्रतिधारण दर हासिल की</li>
          <li>800 से अधिक बच्चों को पूरक पोषण और स्वास्थ्य देखभाल प्रदान की</li>
          <li>शैक्षिक पहलों का समर्थन करने के लिए 100+ सामुदायिक स्वयंसेवकों को प्रशिक्षित किया</li>
        </ul>
        <p>लेकिन अभी भी बहुत काम बाकी है। आपके समर्थन से, हम और अधिक बच्चों तक पहुंच सकते हैं और पूरे क्षेत्र में समुदायों में स्थायी परिवर्तन ला सकते हैं।</p>
      `,
      imageUrl: '/images/the-need.svg',
      statsImageUrl: '/images/statistics-chart.svg'
    };
    
    return NextResponse.json(fallbackData, { status: 200 });
  }
}
