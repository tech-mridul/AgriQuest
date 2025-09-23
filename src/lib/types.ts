export type Mission = {
  id: string;
  title: string;
  description: string;
  points: number;
  category: 'Soil Health' | 'Water Conservation' | 'Pest Management' | 'Biodiversity';
  isCompleted: boolean;
};

export type Badge = {
  id: string;
  name: string;
  icon: string;
  imageHint: string;
  description: string;
};

export type CommunityPost = {
  id: string;
  author: {
    name: string;
    avatar: string; // image id
  };
  timestamp: any; // Can be a string or a Firestore Timestamp
  content: string;
  image?: string; // image id
  likes: number;
  comments: number;
};

export type LeaderboardEntry = {
  rank: number;
  farmer: {
    name: string;
    avatar: string; // image id
  };
  score: number;
};

export type EducationalContent = {
  id: string;
  title: string;
  summary: string;
  category: string;
};
