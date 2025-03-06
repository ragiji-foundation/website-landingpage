import React from 'react';
import { Text, Box } from '@mantine/core';
import DOMPurify from 'isomorphic-dompurify';
import parse from 'html-react-parser';

export interface RichTextContentProps {
  content: any; // Can be string, object or document
  truncate?: boolean;
  maxLength?: number;
  className?: string;
}

/**
 * Safely renders rich text content with optional truncation
 */
export function RichTextContent({
  content,
  truncate = false,
  maxLength = 100,
  className
}: RichTextContentProps) {
  // Function to safely extract text from different content formats
  const extractText = (content: any): string => {
    if (!content) return '';

    // Handle string content directly
    if (typeof content === 'string') return content;

    // Handle rich text document format
    if (content.type === 'doc' && Array.isArray(content.content)) {
      interface RichTextNode {
        type: string;
        content?: RichTextNode[];
        text?: string;
      }

      interface RichTextDocument {
        type: 'doc';
        content: RichTextNode[];
      }

      const extractTextFromDocument = (content: RichTextDocument): string => {
        return content.content
          .map(node => {
            if (node.type === 'paragraph' && Array.isArray(node.content)) {
              return node.content.map(child => child.text || '').join('');
            }
            return '';
          })
          .join(' ');
      };
    }

    // Handle array of nodes
    if (Array.isArray(content)) {
      return content
        .map(node => {
          if (node.text) return node.text;
          if (node.content) return extractText(node.content);
          return '';
        })
        .join(' ');
    }

    // HTML string inside object
    if (content.html) return content.html;

    // Last resort - stringify (but remove most HTML/JSON artifacts)
    try {
      const str = JSON.stringify(content);
      return str.replace(/["{}\[\]\\]/g, ' ').substring(0, 1000);
    } catch (e) {
      return '';
    }
  };

  // Function to safely render HTML content
  const renderHTML = (htmlContent: string) => {
    const sanitized = DOMPurify.sanitize(htmlContent, {
      ADD_TAGS: ['h1', 'h2', 'h3', 'h4', 'p', 'span', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'br'],
      ADD_ATTR: ['href', 'target', 'rel'],
    });

    return parse(sanitized);
  };

  // Handle rendering based on content type
  const renderContent = () => {
    try {
      if (!content) return <Text>No content available</Text>;

      // Handle HTML string content
      if (typeof content === 'string') {
        const htmlContent = content;

        if (truncate && maxLength) {
          const textOnly = extractText(content);
          if (textOnly.length > maxLength) {
            return <Text>{textOnly.substring(0, maxLength)}...</Text>;
          }
        }

        return <Box>{renderHTML(htmlContent)}</Box>;
      }

      // Handle other content formats by first extracting text
      const textContent = extractText(content);

      // Truncate if needed
      if (truncate && maxLength && textContent.length > maxLength) {
        return <Text>{textContent.substring(0, maxLength)}...</Text>;
      }

      // If content has HTML property
      if (content.html) {
        return <Box>{renderHTML(content.html)}</Box>;
      }

      // Default text rendering
      return <Text>{textContent}</Text>;
    } catch (error) {
      console.error('Error rendering rich text:', error);
      return <Text color="dimmed">Unable to display content</Text>;
    }
  };

  return <div className={className}>{renderContent()}</div>;
}
