import { sanitizeHtml } from '@/utils/safeHtml';

export const FeatureDescription = ({ html }: { html: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }} />;
};
