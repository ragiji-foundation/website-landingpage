import type { JSX } from "react";
import React from "react";

/**
 * Parse JSON content into renderable React components
 */
export function parseJsonContent(jsonString: string | null | undefined): React.ReactNode {
  if (!jsonString) return null;
  
  try {
    // Handle case where jsonString is already an object
    const parsedContent = typeof jsonString === 'string' ? 
      // Try to parse as JSON
      JSON.parse(jsonString) : jsonString;
    
    // If it's not a valid structure or just plain text
    if (typeof parsedContent === 'string') {
      return <p>{parsedContent}</p>;
    }
    
    // Handle different JSON formats
    if (!parsedContent?.root?.children) {
      // Check if it's an array
      if (Array.isArray(parsedContent)) {
        return parsedContent.map((item, index) => <p key={index}>{item}</p>);
      }
      
      // If it's just an object without the expected structure, stringify it
      return <p>{JSON.stringify(parsedContent)}</p>;
    }
    
    // Function to recursively render children nodes
    const renderNode = (node: any, index: number): React.ReactNode => {
      // Handle text nodes
      if (node.type === 'text') {
        let content = node.text;
        if (node.format === 1 || node.bold) content = <strong key={index}>{content}</strong>;
        if (node.format === 2 || node.italic) content = <em key={index}>{content}</em>;
        if (node.format === 4 || node.underline) content = <u key={index}>{content}</u>;
        if (node.format === 8 || node.strikethrough) content = <s key={index}>{content}</s>;
        if (node.format === 16 || node.code) content = <code key={index}>{content}</code>;
        return content;
      }
      
      // Handle paragraph nodes
      if (node.type === 'paragraph') {
        return <p key={index}>{node.children?.map((child: any, i: number) => renderNode(child, i))}</p>;
      }
      
      // Handle heading nodes
      if (node.type === 'heading') {
        const HeadingTag = `h${node.tag}` as keyof JSX.IntrinsicElements;
        return <HeadingTag key={index}>{node.children?.map((child: any, i: number) => renderNode(child, i))}</HeadingTag>;
      }
      
      // Handle list nodes
      if (node.type === 'list') {
        const ListTag = node.listType === 'bullet' ? 'ul' : 'ol';
        return (
          <ListTag key={index}>
            {node.children?.map((child: any, i: number) => renderNode(child, i))}
          </ListTag>
        );
      }
      
      // Handle list item nodes
      if (node.type === 'listitem') {
        return <li key={index}>{node.children?.map((child: any, i: number) => renderNode(child, i))}</li>;
      }
      
      // Handle link nodes
      if (node.type === 'link') {
        return (
          <a key={index} href={node.url} target="_blank" rel="noopener noreferrer">
            {node.children?.map((child: any, i: number) => renderNode(child, i))}
          </a>
        );
      }
      
      // Handle image nodes
      if (node.type === 'image') {
        return <img key={index} src={node.src} alt={node.alt || ''} />;
      }
      
      // Handle quote nodes
      if (node.type === 'quote') {
        return <blockquote key={index}>{node.children?.map((child: any, i: number) => renderNode(child, i))}</blockquote>;
      }
      
      // Recursively process children for other node types
      if (node.children) {
        return node.children.map((child: any, i: number) => renderNode(child, i));
      }
      
      // Default case: return the text content or empty string
      return node.text || '';
    };
    
    // Start rendering from root children
    return parsedContent.root.children.map((node: any, index: number) => renderNode(node, index));
  } catch (error) {
    // If JSON parsing fails, return the original content
    console.error('Error parsing JSON content:', error);
    return <p>{jsonString}</p>;
  }
}

/**
 * Component to render rich text content from JSON string
 */
export function RichTextContent({ content }: { content: string | null | undefined }) {
  // Handle missing content
  if (!content) {
    return <div className="rich-text-content empty">No content available</div>;
  }
  
  // Handle plain text that isn't JSON
  if ((typeof content === 'string' && !content.trim().startsWith('{')) && !content.trim().startsWith('[')) {
    return (
      <div className="rich-text-content plaintext">
        {content.split('\n').map((line, i) => <p key={i}>{line}</p>)}
      </div>
    );
  }

  return (
    <div className="rich-text-content">
      {parseJsonContent(content)}
    </div>
  );
}