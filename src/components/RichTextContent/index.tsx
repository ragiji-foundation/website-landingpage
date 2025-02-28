'use client';
import { Box, Text, List } from '@mantine/core';
import classes from './RichTextContent.module.css';

interface RichTextNode {
  type: string;
  text?: string;
  marks?: Array<{ type: string }>;
  content?: RichTextNode[];
}

interface RichTextDocument {
  type: 'doc';
  content: RichTextNode[];
}

interface RichTextContentProps {
  content: RichTextDocument;
  truncate?: boolean;
  maxLength?: number;
}

export function RichTextContent({ content, truncate = false, maxLength = 150 }: RichTextContentProps) {
  const renderNode = (node: RichTextNode): React.ReactNode => {
    switch (node.type) {
      case 'paragraph':
        return (
          <Text className={classes.paragraph}>
            {node.content?.map((child, index) => renderNode(child))}
          </Text>
        );

      case 'text':
        let text = node.text || '';
        if (truncate && text.length > maxLength) {
          text = text.slice(0, maxLength) + '...';
        }

        if (node.marks?.some(mark => mark.type === 'bold')) {
          return <strong key={text}>{text}</strong>;
        }
        if (node.marks?.some(mark => mark.type === 'italic')) {
          return <em key={text}>{text}</em>;
        }
        return text;

      case 'bulletList':
        return (
          <List className={classes.list}>
            {node.content?.map((item, index) => (
              <List.Item key={index}>{item.content?.[0].content?.[0].text}</List.Item>
            ))}
          </List>
        );

      case 'heading':
        const HeadingText = ({ children }: { children: React.ReactNode }) => (
          <Text
            className={classes.heading}
            fw={700}
            fz={node.type === 'heading-1' ? 'xl' : 'lg'}
          >
            {children}
          </Text>
        );
        return (
          <HeadingText>
            {node.content?.map((child, index) => renderNode(child))}
          </HeadingText>
        );

      default:
        return null;
    }
  };

  if (!content || !content.content) {
    return null;
  }

  return (
    <Box className={classes.richText}>
      {content.content.map((node, index) => (
        <div key={index}>{renderNode(node)}</div>
      ))}
    </Box>
  );
}
