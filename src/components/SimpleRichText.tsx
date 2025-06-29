'use client';

import React from 'react';
import DOMPurify from 'isomorphic-dompurify';

interface SimpleRichTextProps {
  content: string;
  className?: string;
}

/**
 * A component for safely rendering HTML content
 */
export function SimpleRichText({ content, className = '' }: SimpleRichTextProps) {
  if (!content) return null;

  // Sanitize HTML content with allowed tags and attributes
  const sanitizedContent = DOMPurify.sanitize(content, {
    ADD_ATTR: ['target', 'rel'],
    ALLOWED_TAGS: ['p', 'a', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'em', 'strong', 'br', 'b', 'i', 'span'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'style']
  });

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}