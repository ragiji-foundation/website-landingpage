export interface StatItem {
  label: string;
  value: string;
  icon?: string;
}

export interface Challenge {
  title: string;
  description: string;
  imageUrl: string;
}

export interface EducationCrisis {
  mainText: string;
  statistics: string;
  impact: string;
  imageUrl: string;
  statsImageUrl: string;
}

export interface TheNeedData {
  headerSection: {
    title: string;
    subtitle: string;
    content: string;
    imageUrl: string;
  };

  educationCrisis: {
    title: string;
    mainText: string;
    statistics: string[];
    impact: string;
    imageUrl: string;
    statsImageUrl: string;
  };

  challengesSection: {
    title: string;
    challenges: Challenge[];
  };

  statisticsSection: {
    title: string;
    description: string;
    stats: StatItem[];
  };

  solutionSection: {
    title: string;
    description: string;
    imageUrl: string;
    keyPoints: string[];
  };
}
