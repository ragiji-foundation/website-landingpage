'use client';
import { Box, Text } from '@mantine/core';
import React from 'react';
import classes from './RichTextContent.module.css';

export interface RichTextContentProps {
  content: any; // Consider using a more specific type based on your content structure
  truncate?: boolean;
  maxLength?: number;
}

/**
 * Component for rendering rich text content (HTML) safely
 */
export function RichTextContent({ content, truncate = false, maxLength = 100 }: RichTextContentProps) {
  // Function to safely get text content from rich text
  const getPlainText = (richContent: any): string => {
    if (!richContent) return '';

    // If content is already a string, return it
    if (typeof richContent === 'string') return richContent;

    // Handle different rich text formats - adjust this based on your actual content structure
    try {
      // This is a placeholder implementation - adjust based on your rich text format
      if (richContent.blocks) {
        // Handle Draft.js or similar format
        return richContent.blocks.map((block: any) => block.text).join(' ');
      }

      // JSON.stringify as fallback (not ideal for production)
      return JSON.stringify(richContent);
    } catch (e) {
      console.error('Error parsing rich text content', e);
      return '';
    }
  };

  const renderContent = () => {
    try {
      let textContent = getPlainText(content);

      if (truncate && maxLength && textContent.length > maxLength) {
        textContent = textContent.substring(0, maxLength) + '...';
      }

      return <Text>{textContent}</Text>;
    } catch (error) {
      console.error('Error rendering rich text content', error);
      return <Text>Unable to display content</Text>;
    }
  };

  return <div>{renderContent()}</div>;
}

export default RichTextContent;
