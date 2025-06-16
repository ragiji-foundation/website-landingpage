import { Testimonial } from '@/types/testimonial';

// Locale-specific mock data
export const mockTestimonials: Record<string, Testimonial[]> = {
  en: [
    {
      id: "1",
      name: "Rahul Kumar",
      role: "Student",
      content: "Thanks to RAGI JI FOUNDATION, I was able to continue my education and pursue my dreams. The support and guidance I received were invaluable.",
      imageUrl: "/testimonials/student-rahul.jpg",
      order: 1
    },
    // ... existing English testimonials
  ],
  hi: [
    {
      id: "1",
      name: "राहुल कुमार",
      role: "छात्र",
      content: "रागी जी फाउंडेशन के कारण, मैं अपनी शिक्षा जारी रख सका और अपने सपनों को आगे बढ़ा सका। मुझे मिला समर्थन और मार्गदर्शन अमूल्य था।",
      imageUrl: "/testimonials/student-rahul.jpg",
      order: 1
    },
    // ... Hindi versions of testimonials
  ]
};
