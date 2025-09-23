import type { Mission, Badge, CommunityPost, LeaderboardEntry, EducationalContent } from '@/lib/types';
import placeholderJson from './placeholder-images.json';

const images = placeholderJson.placeholderImages;

const findImage = (id: string) => images.find(img => img.id)?.imageUrl || '';
const findImageHint = (id: string) => images.find(img => img.id)?.imageHint || '';


export const MISSIONS: Mission[] = [
  {
    id: 'm1',
    title: 'Implement No-Till Farming',
    description: 'Reduce soil erosion by implementing no-till practices on a 10-acre plot.',
    points: 150,
    category: 'Soil Health',
    isCompleted: true,
  },
  {
    id: 'm2',
    title: 'Install Drip Irrigation',
    description: 'Install a drip irrigation system to conserve water in your main field.',
    points: 200,
    category: 'Water Conservation',
    isCompleted: true,
  },
  {
    id: 'm3',
    title: 'Plant Cover Crops',
    description: 'Plant a cover crop mix of clover and rye on 25 acres.',
    points: 120,
    category: 'Soil Health',
    isCompleted: false,
  },
  {
    id: 'm4',
    title: 'Scout for Pests',
    description: 'Conduct weekly pest scouting and log your findings for one month.',
    points: 80,
    category: 'Pest Management',
    isCompleted: false,
  },
  {
    id: 'm5',
    title: 'Create a Pollinator Habitat',
    description: 'Establish a 1-acre native wildflower habitat for pollinators.',
    points: 250,
    category: 'Biodiversity',
    isCompleted: false,
  },
];

export const BADGES: Badge[] = [
  {
    id: 'b1',
    name: 'Soil Savior',
    icon: findImage('badge-soil-savior'),
    imageHint: findImageHint('badge-soil-savior'),
    description: 'Completed 5 missions focused on improving soil health.',
  },
  {
    id: 'b2',
    name: 'Water Warrior',
    icon: findImage('badge-water-warrior'),
    imageHint: findImageHint('badge-water-warrior'),
    description: 'Mastered water conservation techniques on your farm.',
  },
  {
    id: 'b3',
    name: 'Pest Patroller',
    icon: findImage('badge-pest-patroller'),
    imageHint: findImageHint('badge-pest-patroller'),
    description: 'Excelled in integrated pest management.',
  },
  {
    id: 'b4',
    name: 'Green Guardian',
    icon: findImage('badge-green-guardian'),
    imageHint: findImageHint('badge-green-guardian'),
    description: 'Achieved a sustainability score of over 90%.',
  },
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'p1',
    author: { name: 'Sarah Jones', avatar: 'user-avatar-1' },
    timestamp: '2h ago',
    content: "Just finished my cover crop mission! Seeing a huge difference in soil moisture already. Clover and rye mix is working wonders.",
    image: 'community-post-1',
    likes: 42,
    comments: 8,
  },
  {
    id: 'p2',
    author: { name: 'David Lee', avatar: 'user-avatar-2' },
    timestamp: '1d ago',
    content: "Any tips for dealing with aphids on corn without heavy pesticides? I'm trying to complete the IPM quests.",
    likes: 15,
    comments: 12,
  },
  {
    id: 'p3',
    author: { name: 'Maria Garcia', avatar: 'user-avatar-3' },
    timestamp: '3d ago',
    content: "The real-time rewards system is so motivating! Just cashed in some points for a soil testing kit. #AgriQuest",
    likes: 88,
    comments: 21,
  },
];

export const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, farmer: { name: 'Maria Garcia', avatar: 'user-avatar-3' }, score: 8540 },
  { rank: 2, farmer: { name: 'John Smith', avatar: 'user-avatar-main' }, score: 8210 },
  { rank: 3, farmer: { name: 'Sarah Jones', avatar: 'user-avatar-1' }, score: 7980 },
  { rank: 4, farmer: { name: 'David Lee', avatar: 'user-avatar-2' }, score: 7500 },
  { rank: 5, farmer: { name: 'Tom Chen', avatar: 'user-avatar-4' }, score: 7120 },
  { rank: 6, farmer: { name: 'Emily White', avatar: 'user-avatar-main' }, score: 6890 },
];


export const EDUCATIONAL_CONTENT: EducationalContent[] = [
    {
      id: 'e1',
      title: 'The Ultimate Guide to No-Till Farming',
      summary: 'Learn the principles, benefits, and challenges of adopting a no-till system.',
      category: 'Soil Health'
    },
    {
      id: 'e2',
      title: 'Smart Irrigation for Modern Farms',
      summary: 'Explore technologies like drip irrigation and soil moisture sensors to optimize water use.',
      category: 'Water'
    },
    {
      id: 'e3',
      title: 'Integrated Pest Management (IPM) Basics',
      summary: 'A beginner\'s guide to controlling pests while minimizing environmental impact.',
      category: 'Pests'
    }
];