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
  educationCrisis: {
    mainText: string;
    statistics: string;
    impact: string;
    imageUrl: string;
    statsImageUrl: string;
  };
}
