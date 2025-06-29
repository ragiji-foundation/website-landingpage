/**
 * CareerStore - Manages state for job listings with fallback handling
 */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { safeFetch } from '@/utils/api-config';

export interface JobListing {
  id: string;
  slug: string;
  title: string;
  titleHi?: string;
  description: string;
  descriptionHi?: string;
  responsibilities: string;
  responsibilitiesHi?: string;
  qualifications: string;
  qualificationsHi?: string;
  benefits?: string;
  benefitsHi?: string;
  department: string;
  location: string;
  salary?: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Volunteer';
  applicationUrl?: string;
  postedDate: string;
  closingDate?: string;
  isActive: boolean;
}

// Fallback job listings
const fallbackJobs: JobListing[] = [
  {
    id: '1',
    slug: 'program-coordinator',
    title: 'Program Coordinator',
    titleHi: 'प्रोग्राम कोऑर्डिनेटर',
    description: `
      <p>We are looking for a dedicated Program Coordinator to oversee our educational initiatives across multiple centers. The ideal candidate will be passionate about education, experienced in program management, and committed to making a difference in underserved communities.</p>
      <p>As a Program Coordinator, you will be responsible for implementing educational programs, coordinating with center managers, and ensuring that our programs meet the highest standards of quality and impact.</p>
    `,
    descriptionHi: `
      <p>हम अपने कई केंद्रों में शैक्षिक पहलों की देखरेख के लिए एक समर्पित प्रोग्राम कोऑर्डिनेटर की तलाश कर रहे हैं। आदर्श उम्मीदवार शिक्षा के प्रति जुनूनी, कार्यक्रम प्रबंधन में अनुभवी, और वंचित समुदायों में बदलाव लाने के लिए प्रतिबद्ध होगा।</p>
      <p>एक प्रोग्राम कोऑर्डिनेटर के रूप में, आप शैक्षिक कार्यक्रमों को लागू करने, केंद्र प्रबंधकों के साथ समन्वय करने, और यह सुनिश्चित करने के लिए जिम्मेदार होंगे कि हमारे कार्यक्रम गुणवत्ता और प्रभाव के उच्चतम मानकों को पूरा करते हैं।</p>
    `,
    responsibilities: `
      <ul>
        <li>Develop and implement educational programs aligned with organization goals</li>
        <li>Coordinate with center managers to ensure effective program delivery</li>
        <li>Monitor and evaluate program performance and outcomes</li>
        <li>Prepare program reports and documentation</li>
        <li>Collaborate with stakeholders including volunteers, donors, and community partners</li>
        <li>Manage program budgets and resources</li>
        <li>Identify opportunities for program improvement and expansion</li>
      </ul>
    `,
    responsibilitiesHi: `
      <ul>
        <li>संगठन के लक्ष्यों के अनुरूप शैक्षिक कार्यक्रम विकसित और कार्यान्वित करना</li>
        <li>प्रभावी कार्यक्रम वितरण सुनिश्चित करने के लिए केंद्र प्रबंधकों के साथ समन्वय करना</li>
        <li>कार्यक्रम प्रदर्शन और परिणामों की निगरानी और मूल्यांकन करना</li>
        <li>कार्यक्रम रिपोर्ट और दस्तावेज तैयार करना</li>
        <li>स्वयंसेवकों, दाताओं और समुदाय भागीदारों सहित हितधारकों के साथ सहयोग करना</li>
        <li>कार्यक्रम बजट और संसाधनों का प्रबंधन करना</li>
        <li>कार्यक्रम सुधार और विस्तार के अवसरों की पहचान करना</li>
      </ul>
    `,
    qualifications: `
      <ul>
        <li>Bachelor's degree in education, social work, or related field</li>
        <li>Minimum 3 years' experience in program management or coordination</li>
        <li>Strong understanding of educational methodologies and practices</li>
        <li>Excellent organizational and project management skills</li>
        <li>Proficient in both English and Hindi</li>
        <li>Experience working with NGOs or in the education sector preferred</li>
        <li>Ability to travel between centers (30% travel required)</li>
      </ul>
    `,
    qualificationsHi: `
      <ul>
        <li>शिक्षा, सामाजिक कार्य, या संबंधित क्षेत्र में स्नातक की डिग्री</li>
        <li>कार्यक्रम प्रबंधन या समन्वय में न्यूनतम 3 वर्ष का अनुभव</li>
        <li>शैक्षिक पद्धतियों और प्रथाओं की मजबूत समझ</li>
        <li>उत्कृष्ट संगठनात्मक और परियोजना प्रबंधन कौशल</li>
        <li>अंग्रेजी और हिंदी दोनों में प्रवीण</li>
        <li>एनजीओ या शिक्षा क्षेत्र में काम करने का अनुभव वरीयता दी जाती है</li>
        <li>केंद्रों के बीच यात्रा करने की क्षमता (30% यात्रा आवश्यक)</li>
      </ul>
    `,
    benefits: `
      <ul>
        <li>Competitive salary based on experience</li>
        <li>Health insurance coverage</li>
        <li>Professional development opportunities</li>
        <li>Flexible work schedule</li>
        <li>Opportunity to make a significant impact on children's lives</li>
      </ul>
    `,
    benefitsHi: `
      <ul>
        <li>अनुभव के आधार पर प्रतिस्पर्धी वेतन</li>
        <li>स्वास्थ्य बीमा कवरेज</li>
        <li>पेशेवर विकास के अवसर</li>
        <li>लचीली कार्य अनुसूची</li>
        <li>बच्चों के जीवन पर महत्वपूर्ण प्रभाव डालने का अवसर</li>
      </ul>
    `,
    department: 'Education',
    location: 'Delhi NCR',
    salary: '₹5,00,000 - ₹7,00,000 per annum',
    jobType: 'Full-time',
    applicationUrl: 'https://forms.example.com/apply/program-coordinator',
    postedDate: '2023-06-01',
    closingDate: '2023-07-15',
    isActive: true
  },
  {
    id: '2',
    slug: 'volunteer-coordinator',
    title: 'Volunteer Coordinator',
    titleHi: 'स्वयंसेवक समन्वयक',
    description: `
      <p>We are seeking an energetic Volunteer Coordinator to manage our growing volunteer program. The ideal candidate will be passionate about community engagement and skilled at recruiting, training, and managing volunteers for our various initiatives.</p>
      <p>This role is critical in ensuring that our volunteers have a meaningful experience while effectively contributing to our mission of providing education to underserved children.</p>
    `,
    descriptionHi: `
      <p>हम अपने बढ़ते स्वयंसेवक कार्यक्रम के प्रबंधन के लिए एक ऊर्जावान स्वयंसेवक समन्वयक की तलाश कर रहे हैं। आदर्श उम्मीदवार सामुदायिक जुड़ाव के प्रति जुनूनी होगा और हमारी विभिन्न पहलों के लिए स्वयंसेवकों की भर्ती, प्रशिक्षण और प्रबंधन में कुशल होगा।</p>
      <p>यह भूमिका यह सुनिश्चित करने में महत्वपूर्ण है कि हमारे स्वयंसेवकों को एक सार्थक अनुभव हो जबकि वे वंचित बच्चों को शिक्षा प्रदान करने के हमारे मिशन में प्रभावी ढंग से योगदान करें।</p>
    `,
    responsibilities: `
      <ul>
        <li>Develop and implement volunteer recruitment strategies</li>
        <li>Screen, interview, and place volunteers in appropriate roles</li>
        <li>Design and conduct volunteer orientation and training programs</li>
        <li>Maintain volunteer records and documentation</li>
        <li>Create volunteer schedules and coordinate assignments</li>
        <li>Recognize and appreciate volunteer contributions</li>
        <li>Evaluate volunteer program effectiveness and identify areas for improvement</li>
      </ul>
    `,
    responsibilitiesHi: `
      <ul>
        <li>स्वयंसेवक भर्ती रणनीतियों को विकसित और कार्यान्वित करना</li>
        <li>स्वयंसेवकों को स्क्रीन करना, साक्षात्कार लेना और उपयुक्त भूमिकाओं में रखना</li>
        <li>स्वयंसेवक अभिविन्यास और प्रशिक्षण कार्यक्रम डिजाइन और संचालित करना</li>
        <li>स्वयंसेवक रिकॉर्ड और दस्तावेज बनाए रखना</li>
        <li>स्वयंसेवक कार्यक्रम बनाना और असाइनमेंट का समन्वय करना</li>
        <li>स्वयंसेवक योगदान को पहचानना और सराहना करना</li>
        <li>स्वयंसेवक कार्यक्रम प्रभावशीलता का मूल्यांकन करना और सुधार के क्षेत्रों की पहचान करना</li>
      </ul>
    `,
    qualifications: `
      <ul>
        <li>Bachelor's degree in human resources, social work, or related field</li>
        <li>2+ years' experience in volunteer management or coordination</li>
        <li>Excellent interpersonal and communication skills</li>
        <li>Strong organizational abilities and attention to detail</li>
        <li>Experience with volunteer management software preferred</li>
        <li>Ability to work evenings and weekends occasionally for volunteer events</li>
        <li>Proficiency in MS Office and Google Workspace</li>
      </ul>
    `,
    qualificationsHi: `
      <ul>
        <li>मानव संसाधन, सामाजिक कार्य, या संबंधित क्षेत्र में स्नातक की डिग्री</li>
        <li>स्वयंसेवक प्रबंधन या समन्वय में 2+ वर्षों का अनुभव</li>
        <li>उत्कृष्ट पारस्परिक और संचार कौशल</li>
        <li>मजबूत संगठनात्मक क्षमताएं और विवरण पर ध्यान</li>
        <li>स्वयंसेवक प्रबंधन सॉफ्टवेयर के साथ अनुभव वांछित</li>
        <li>स्वयंसेवक कार्यक्रमों के लिए कभी-कभी शाम और सप्ताहांत में काम करने की क्षमता</li>
        <li>MS Office और Google Workspace में प्रवीणता</li>
      </ul>
    `,
    department: 'Community Engagement',
    location: 'Mumbai',
    jobType: 'Full-time',
    postedDate: '2023-05-15',
    isActive: true
  }
];

interface CareerStore {
  jobs: JobListing[];
  loading: boolean;
  error: Error | null;
  fetchJobs: (locale?: string) => Promise<void>;
  fetchJobById: (id: string, locale: string) => Promise<JobListing | null>;
}

export const useCareerStore = create<CareerStore>()(
  devtools(
    (set, get) => ({
      jobs: [],
      loading: false,
      error: null,
      
      fetchJobs: async (locale = 'en') => {
        set({ loading: true, error: null });
        const { data, error, fromFallback } = await safeFetch<JobListing[]>(
          `/api/careers?locale=${locale}`,
          fallbackJobs,
          { method: 'GET' }
        );
        
        if (error) {
          console.warn(`Error fetching job listings: ${error.message}`);
          set({ 
            jobs: data,
            error,
            loading: false 
          });
          return;
        }
        
        try {
          // Filter out inactive jobs and sort by posted date (newest first)
          const activeJobs = data.filter(job => job.isActive);
          const sortedJobs = activeJobs.sort((a, b) => 
            new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
          );
          
          if (fromFallback) {
            console.log('Using fallback data for job listings');
          } else {
            console.log(`Loaded ${sortedJobs.length} job listings from API`);
          }
          
          set({ jobs: sortedJobs, loading: false });
        } catch (processingError) {
          console.error('Error processing job listings:', processingError);
          set({ 
            jobs: fallbackJobs,
            error: processingError instanceof Error ? processingError : new Error(String(processingError)), 
            loading: false 
          });
        }
      },
      
      fetchJobById: async (jobId: string, locale: string) => {
        set({ loading: true, error: null });
        
        // First check if we already have the job in our state
        const { jobs } = get();
        if (jobs.length > 0) {
          const existingJob = jobs.find(job => 
            job.id === jobId || job.slug === jobId
          );
          
          if (existingJob) {
            set({ loading: false });
            return existingJob;
          }
        }
        
        // If not found in state, try to fetch it
        try {
          const fallbackJob = fallbackJobs.find(job => job.id === jobId || job.slug === jobId) || {
            id: '',
            slug: '',
            title: '',
            titleHi: '',
            description: '',
            descriptionHi: '',
            responsibilities: '',
            responsibilitiesHi: '',
            qualifications: '',
            qualificationsHi: '',
            benefits: '',
            benefitsHi: '',
            department: '',
            location: '',
            salary: '',
            jobType: 'Full-time',
            applicationUrl: '',
            postedDate: '',
            closingDate: '',
            isActive: false
          };
          const { data, error, fromFallback } = await safeFetch<JobListing>(
            `/api/careers/${jobId}?locale=${locale}`,
            fallbackJob,
            { method: 'GET' }
          );
          
          if (error) {
            console.warn(`Error fetching job with ID ${jobId}: ${error.message}`);
            set({ error, loading: false });
            return null;
          }
          
          if (!data) {
            set({ 
              error: new Error(`Job with ID ${jobId} not found`), 
              loading: false 
            });
            return null;
          }
          
          if (fromFallback) {
            console.log(`Using fallback data for job: ${jobId}`);
          }
          
          set({ loading: false });
          return data;
        } catch (fetchError) {
          console.error(`Error fetching job with ID ${jobId}:`, fetchError);
          set({ 
            error: fetchError instanceof Error ? fetchError : new Error(String(fetchError)), 
            loading: false 
          });
          return null;
        }
      }
    }),
    { name: 'career-store' }
  )
);

// Listen for locale changes
if (typeof window !== 'undefined') {
  window.addEventListener('locale-changed', (event) => {
    const customEvent = event as CustomEvent;
    const { locale } = customEvent.detail;
    useCareerStore.getState().fetchJobs(locale);
  });
}
