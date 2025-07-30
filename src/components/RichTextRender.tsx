import { Box } from '@mantine/core';
import DOMPurify from 'isomorphic-dompurify';
import classes from './RichTextRender.module.css';

interface RichTextRenderProps {
  content: string;
  className?: string;
}

export function RichTextRender({ content, className }: RichTextRenderProps) {
  if (!content) {
    return null;
  }

  // Sanitize the HTML content for security
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <Box
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      className={`${classes.richTextContent} ${className || ''}`}
    />
  );
}

// Export with the old name for backwards compatibility
export const LexicalRender = RichTextRender;
