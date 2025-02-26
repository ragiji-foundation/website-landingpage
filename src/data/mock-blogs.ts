export const mockBlogs = {
  total: 5,
  posts: [
    {
      id: "1",
      slug: "transforming-lives-through-education",
      title: "Transforming Lives Through Education: A Journey of Hope",
      excerpt: "Discover how our education initiatives are creating lasting impact in underserved communities...",
      coverImage: "/blog/education-impact.jpg",
      publishedAt: "2024-01-15T10:00:00Z",
      readingTime: "5 min read",
      author: {
        name: "Priya Kumar",
        avatar: "/team/priya-kumar.jpg",
        bio: "Education Program Director with 10+ years experience in rural development"
      },
      content: {
        html: `
          <article>
            <h1>Transforming Lives Through Education: A Journey of Hope</h1>
            
            <p>In the heart of rural India, where opportunities often seem limited, education becomes the beacon of hope that lights up countless young minds. Our journey began with a simple vision: to make quality education accessible to every child, regardless of their socioeconomic background.</p>

            <h2>The Power of Education</h2>
            <p>Through our various initiatives, we've witnessed firsthand how education can break the cycle of poverty and create lasting change. Some key achievements include:</p>
            
            <ul>
              <li>Establishment of 50+ learning centers in remote villages</li>
              <li>Implementation of digital literacy programs reaching 1000+ students</li>
              <li>Training and empowerment of 200+ local teachers</li>
            </ul>

            <img src="/blog/classroom-learning.jpg" alt="Students engaged in classroom learning" />
            
            <blockquote>
              <p>"Education is not just about learning to read and write; it's about empowering individuals to dream bigger and achieve more." - Priya Kumar</p>
            </blockquote>

            <h2>Impact Stories</h2>
            <p>Meet Ravi, a 12-year-old from Madhya Pradesh, who walked 5 kilometers daily to attend our learning center. Today, he's one of the top performers in his district and dreams of becoming a software engineer.</p>

            <h3>Our Approach</h3>
            <p>We believe in holistic education that goes beyond textbooks. Our curriculum includes:</p>
            
            <ul>
              <li>Practical skill development</li>
              <li>Digital literacy training</li>
              <li>Personal development workshops</li>
              <li>Community engagement projects</li>
            </ul>

            <img src="/blog/digital-literacy.jpg" alt="Students learning computer skills" />
          </article>
        `,
        meta: {
          title: "Transforming Lives Through Education | NGO Success Stories",
          description: "Discover how our education initiatives are creating lasting impact in underserved communities. Read success stories and learn about our approach to quality education.",
          keywords: "education, rural development, NGO, digital literacy, community development",
          ogImage: "/blog/education-impact.jpg"
        }
      }
    },
    {
      id: "2",
      slug: "empowering-women-transforming-communities",
      title: "Empowering Women, Transforming Communities: Stories of Change",
      excerpt: "Discover how our women empowerment programs are creating sustainable economic growth and social change in rural communities...",
      coverImage: "/blog/women-empowerment.jpg",
      publishedAt: "2024-01-20T09:00:00Z",
      readingTime: "6 min read",
      author: {
        name: "Meera Singh",
        avatar: "/team/meera-singh.jpg",
        bio: "Women Empowerment Program Lead with expertise in microfinance and skill development"
      },
      content: {
        html: `
          <article>
            <h1>Empowering Women, Transforming Communities: Stories of Change</h1>
            
            <p>In rural India, women are becoming the catalysts of change, breaking barriers and creating new opportunities for themselves and their communities. Through our comprehensive women empowerment programs, we're witnessing remarkable transformations.</p>

            <img src="/blog/women-entrepreneurs.jpg" alt="Women entrepreneurs showcasing their products" />

            <h2>Breaking Barriers Through Education</h2>
            <p>Our initiatives focus on both educational and economic empowerment:</p>
            
            <ul>
              <li>Literacy programs reaching 2000+ women annually</li>
              <li>Skill development workshops in 25 villages</li>
              <li>Microfinance support for 500+ women entrepreneurs</li>
              <li>Leadership training programs</li>
            </ul>

            <blockquote>
              <p>"When you empower a woman, you empower a generation. We're seeing this transform entire communities." - Meera Singh</p>
            </blockquote>

            <h2>Success Stories</h2>
            <p>Meet Lakshmi, who started with a small tailoring business and now employs 15 women from her village. Her success has inspired many others to pursue their entrepreneurial dreams.</p>

            <img src="/blog/skills-training.jpg" alt="Women participating in skills training workshop" />
          </article>
        `,
        meta: {
          title: "Women Empowerment Success Stories | Rural Development",
          description: "Stories of women entrepreneurs transforming rural communities through skill development and microfinance initiatives.",
          keywords: "women empowerment, rural development, entrepreneurship, microfinance, skill development",
          ogImage: "/blog/women-empowerment.jpg"
        }
      }
    },
    {
      id: "3",
      slug: "healthcare-reaching-remote-villages",
      title: "Healthcare Initiatives: Reaching the Last Mile",
      excerpt: "How mobile health clinics and telemedicine are revolutionizing rural healthcare access...",
      publishedAt: "2024-01-25T11:00:00Z",
      coverImage: "/blog/rural-healthcare.jpg",
      readingTime: "7 min read",
      author: {
        name: "Dr. Rajesh Kumar",
        avatar: "/team/dr-rajesh.jpg",
        bio: "Healthcare Program Director with 15 years of rural medical experience"
      },
      content: {
        html: `
          <article>
            <h1>Healthcare Initiatives: Reaching the Last Mile</h1>
            
            <p>Access to quality healthcare remains a significant challenge in rural India. Our mobile health clinics and telemedicine initiatives are bridging this critical gap.</p>

            <h2>Mobile Health Revolution</h2>
            <ul>
              <li>20+ mobile health clinics serving 100+ villages</li>
              <li>Telemedicine centers in 30 remote locations</li>
              <li>24/7 emergency response system</li>
            </ul>

            <img src="/blog/mobile-clinic.jpg" alt="Mobile health clinic in operation" />

            <blockquote>
              <p>"Healthcare is a fundamental right. Distance should never be a barrier to accessing medical care." - Dr. Rajesh Kumar</p>
            </blockquote>

            <h2>Impact Metrics</h2>
            <p>Our healthcare initiatives have resulted in:</p>
            <ul>
              <li>50,000+ patients treated annually</li>
              <li>80% reduction in maternal health complications</li>
              <li>Vaccination coverage increased to 95%</li>
            </ul>
          </article>
        `,
        meta: {
          title: "Rural Healthcare Initiatives | Mobile Health Clinics",
          description: "Innovative healthcare solutions reaching remote villages through mobile clinics and telemedicine.",
          keywords: "rural healthcare, mobile clinics, telemedicine, medical access, healthcare initiatives",
          ogImage: "/blog/rural-healthcare.jpg"
        }
      }
    },
    {
      id: "4",
      slug: "sustainable-development-rural-india",
      title: "Building Sustainable Communities: A Holistic Approach",
      excerpt: "Exploring innovative approaches to sustainable rural development through renewable energy and water conservation...",
      publishedAt: "2024-02-01T10:00:00Z",
      coverImage: "/blog/sustainable-development.jpg",
      readingTime: "8 min read",
      author: {
        name: "Arun Verma",
        avatar: "/team/arun-verma.jpg",
        bio: "Sustainability Expert specializing in rural development projects"
      },
      content: {
        html: `
          <article>
            <h1>Building Sustainable Communities: A Holistic Approach</h1>
            
            <p>Sustainable development is key to long-term rural prosperity. Our integrated approach combines environmental conservation with economic growth.</p>

            <img src="/blog/solar-installation.jpg" alt="Solar panel installation in village" />

            <h2>Key Initiatives</h2>
            <ul>
              <li>Solar power installations in 50 villages</li>
              <li>Rainwater harvesting systems</li>
              <li>Organic farming practices</li>
              <li>Waste management solutions</li>
            </ul>

            <blockquote>
              <p>"Sustainability isn't just about the environment; it's about creating lasting positive change in communities." - Arun Verma</p>
            </blockquote>

            <h2>Community Impact</h2>
            <p>Our sustainable development projects have achieved:</p>
            <ul>
              <li>40% reduction in energy costs</li>
              <li>60% improvement in water availability</li>
              <li>100+ green jobs created</li>
            </ul>
          </article>
        `,
        meta: {
          title: "Sustainable Rural Development Projects | Environmental Initiatives",
          description: "Implementing sustainable solutions for rural development through renewable energy and conservation.",
          keywords: "sustainable development, rural india, renewable energy, water conservation, environmental initiatives",
          ogImage: "/blog/sustainable-development.jpg"
        }
      }
    },
    {
      id: "5",
      slug: "youth-leadership-future-change",
      title: "Youth Leadership: Nurturing Tomorrow's Change-Makers",
      excerpt: "How our youth leadership programs are creating the next generation of rural development champions...",
      publishedAt: "2024-02-05T09:00:00Z",
      coverImage: "/blog/youth-leadership.jpg",
      readingTime: "6 min read",
      author: {
        name: "Sneha Patel",
        avatar: "/team/sneha-patel.jpg",
        bio: "Youth Program Coordinator and Leadership Development Expert"
      },
      content: {
        html: `
          <article>
            <h1>Youth Leadership: Nurturing Tomorrow's Change-Makers</h1>
            
            <p>The future of rural development lies in empowering young leaders. Our youth leadership programs focus on developing essential skills and fostering innovation.</p>

            <img src="/blog/youth-workshop.jpg" alt="Youth leadership workshop in session" />

            <h2>Program Highlights</h2>
            <ul>
              <li>Leadership development workshops</li>
              <li>Social entrepreneurship training</li>
              <li>Community project initiatives</li>
              <li>Mentorship programs</li>
            </ul>

            <blockquote>
              <p>"Young people aren't just the leaders of tomorrow; they're the changemakers of today." - Sneha Patel</p>
            </blockquote>

            <h2>Success Metrics</h2>
            <p>Our youth programs have achieved:</p>
            <ul>
              <li>1000+ youth leaders trained</li>
              <li>50+ social projects initiated</li>
              <li>80% program graduates leading community initiatives</li>
            </ul>

            <img src="/blog/youth-project.jpg" alt="Youth-led community project" />
          </article>
        `,
        meta: {
          title: "Youth Leadership Programs | Rural Development",
          description: "Developing young leaders and changemakers through comprehensive leadership programs and community initiatives.",
          keywords: "youth leadership, rural development, social entrepreneurship, community projects, mentorship",
          ogImage: "/blog/youth-leadership.jpg"
        }
      }
    }
  ]
};
