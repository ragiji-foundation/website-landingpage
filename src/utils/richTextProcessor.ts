/**
 * Utility to process rich text content from Tiptap editor
 */

import type { JobListing } from '@/store/useCareerStore';

/**
 * Process HTML content from Tiptap editor
 * For now, this just returns the content as-is since Tiptap already provides HTML
 */
export function processRichTextContent(content: string): string {
  if (!content) return '';
  
  // If content is already HTML, return as-is
  // You can add additional processing here if needed
  return content;
}

/**
 * API Job data structure from the backend
 */
interface ApiJobData {
  id: number;
  slug: string;
  title: string;
  titleHi?: string;
  description: string;
  descriptionHi?: string;
  requirements: string;
  requirementsHi?: string;
  location: string;
  locationHi?: string;
  type: string;
  typeHi?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  department?: string;
  salary?: string;
  applicationUrl?: string;
  closingDate?: string;
  benefits?: string;
  benefitsHi?: string;
}

/**
 * Transform API job data to match our JobListing interface
 */
export function transformApiJobData(apiJob: ApiJobData): JobListing {
  return {
    id: apiJob.id.toString(),
    slug: apiJob.slug,
    title: apiJob.title,
    titleHi: apiJob.titleHi,
    description: processRichTextContent(apiJob.description),
    descriptionHi: processRichTextContent(apiJob.descriptionHi || ''),
    responsibilities: processRichTextContent(apiJob.requirements), // Map requirements to responsibilities
    responsibilitiesHi: processRichTextContent(apiJob.requirementsHi || ''),
    qualifications: processRichTextContent(apiJob.requirements), // Use requirements as qualifications
    qualificationsHi: processRichTextContent(apiJob.requirementsHi || ''),
    requirements: processRichTextContent(apiJob.requirements),
    requirementsHi: processRichTextContent(apiJob.requirementsHi || ''),
    benefits: apiJob.benefits ? processRichTextContent(apiJob.benefits) : undefined,
    benefitsHi: apiJob.benefitsHi ? processRichTextContent(apiJob.benefitsHi) : undefined,
    department: apiJob.department || 'General',
    location: apiJob.location,
    locationHi: apiJob.locationHi,
    salary: apiJob.salary,
    jobType: mapJobType(apiJob.type),
    type: apiJob.type,
    typeHi: apiJob.typeHi,
    applicationUrl: apiJob.applicationUrl,
    postedDate: apiJob.createdAt || new Date().toISOString(),
    closingDate: apiJob.closingDate,
    isActive: apiJob.isActive,
    createdAt: apiJob.createdAt,
    updatedAt: apiJob.updatedAt,
  };
}

function mapJobType(type: string): 'Full-time' | 'Part-time' | 'Contract' | 'Volunteer' {
  switch (type?.toLowerCase()) {
    case 'full-time':
    case 'fulltime':
      return 'Full-time';
    case 'part-time':
    case 'parttime':
      return 'Part-time';
    case 'contract':
      return 'Contract';
    case 'volunteer':
      return 'Volunteer';
    default:
      return 'Full-time';
  }
}
