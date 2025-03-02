import { Text, List, Title, Stack } from '@mantine/core';

interface LexicalRenderProps {
  content: any;
}

export function LexicalRender({ content }: LexicalRenderProps) {
  if (!content?.root?.children) {
    return <Text>No content available</Text>;
  }

  const renderTextFormatting = (node: any) => {
    let text = node.text;

    // Apply formatting
    if (node.format & 1) text = <strong key={`bold-${text}`}>{text}</strong>;
    if (node.format & 2) text = <em key={`italic-${text}`}>{text}</em>;
    if (node.format & 4) text = <u key={`underline-${text}`}>{text}</u>;

    return text;
  };

  const renderParagraphContent = (children: any[]) => {
    return children?.map((child: any, index: number) => {
      if (child.type === 'text') {
        return <span key={index}>{renderTextFormatting(child)}</span>;
      }
      return renderNode(child, index);
    });
  };

  const renderNode = (node: any, index: number) => {
    switch (node.type) {
      case 'paragraph':
        return (
          <Text key={index} mb="md">
            {renderParagraphContent(node.children)}
          </Text>
        );

      case 'heading':
        return (
          <Title key={index} order={node.tag === 'h1' ? 1 : 2} mb="md">
            {renderParagraphContent(node.children)}
          </Title>
        );

      case 'list':
        return (
          <List key={index} type={node.listType === 'number' ? 'ordered' : 'unordered'} mb="md">
            {node.children?.map((item: any, i: number) => (
              <List.Item key={i}>
                {renderParagraphContent(item.children)}
              </List.Item>
            ))}
          </List>
        );

      case 'quote':
        return (
          <Text key={index} mb="md" pl="md" style={{ borderLeft: '3px solid var(--mantine-color-gray-4)', fontStyle: 'italic' }}>
            {renderParagraphContent(node.children)}
          </Text>
        );

      default:
        return null;
    }
  };

  return (
    <Stack>
      {content.root.children.map((node: any, index: number) => renderNode(node, index))}
    </Stack>
  );
}
