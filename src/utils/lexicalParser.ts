/**
 * Utility to parse Lexical editor JSON content and convert it to HTML
 */

import type { JobListing } from '@/store/useCareerStore';

interface LexicalNode {
  type: string;
  children?: LexicalNode[];
  text?: string;
  format?: number;
  indent?: number;
  direction?: string;
  listType?: string;
  tag?: string;
  value?: number;
}

interface LexicalContent {
  root: LexicalNode;
}

export function parseLexicalContent(content: string): string {
  if (!content) return '';
  
  try {
    const parsed: LexicalContent = JSON.parse(content);
    return convertNodesToHTML(parsed.root.children || []);
  } catch (error) {
    console.warn('Failed to parse Lexical content:', error);
    return content; // Return as-is if parsing fails
  }
}

function convertNodesToHTML(nodes: LexicalNode[]): string {
  return nodes.map(node => convertNodeToHTML(node)).join('');
}

function convertNodeToHTML(node: LexicalNode): string {
  switch (node.type) {
    case 'paragraph':
      if (!node.children || node.children.length === 0) {
        return '<br/>';
      }
      return `<p>${convertNodesToHTML(node.children)}</p>`;
    
    case 'list':
      const listTag = node.listType === 'bullet' ? 'ul' : 'ol';
      return `<${listTag}>${convertNodesToHTML(node.children || [])}</${listTag}>`;
    
    case 'listitem':
      return `<li>${convertNodesToHTML(node.children || [])}</li>`;
    
    case 'text':
      let text = node.text || '';
      
      // Apply formatting based on format number
      if (node.format) {
        if (node.format & 1) text = `<strong>${text}</strong>`; // Bold
        if (node.format & 2) text = `<em>${text}</em>`; // Italic
        if (node.format & 4) text = `<u>${text}</u>`; // Underline
        if (node.format & 8) text = `<s>${text}</s>`; // Strikethrough
      }
      
      return text;
    
    case 'root':
      return convertNodesToHTML(node.children || []);
    
    default:
      // For unknown node types, try to render children
      return node.children ? convertNodesToHTML(node.children) : '';
  }
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
/**
 * Transform API job data to match our JobListing interface
 */
export function transformApiJobData(apiJob: ApiJobData): JobListing {
  return {
    id: apiJob.id.toString(),
    slug: apiJob.slug,
    title: apiJob.title,
    titleHi: apiJob.titleHi,
    description: parseLexicalContent(apiJob.description),
    descriptionHi: parseLexicalContent(apiJob.descriptionHi || ''),
    responsibilities: parseLexicalContent(apiJob.requirements), // Map requirements to responsibilities
    responsibilitiesHi: parseLexicalContent(apiJob.requirementsHi || ''),
    qualifications: parseLexicalContent(apiJob.requirements), // Use requirements as qualifications
    qualificationsHi: parseLexicalContent(apiJob.requirementsHi || ''),
    requirements: parseLexicalContent(apiJob.requirements),
    requirementsHi: parseLexicalContent(apiJob.requirementsHi || ''),
    benefits: apiJob.benefits ? parseLexicalContent(apiJob.benefits) : undefined,
    benefitsHi: apiJob.benefitsHi ? parseLexicalContent(apiJob.benefitsHi) : undefined,
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
