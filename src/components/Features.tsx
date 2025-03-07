import { useFeaturesStore } from '@/store/useFeaturesStore';
import { FeatureDescription } from './FeatureDescription';

export const Features = () => {
  const { features } = useFeaturesStore();

  return (
    <div>
      {features.map((feature) => (
        <div key={feature.id}>
          <h2>{feature.title}</h2>
          <FeatureDescription html={feature.description} />
        </div>
      ))}
    </div>
  );
};
