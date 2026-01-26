export type Network = 'TIKTOK' | 'INSTAGRAM' | 'FACEBOOK' | 'TWITTER';
export type PostType = 'VIDEO' | 'IMAGE' | 'REELS' | 'CAROUSEL' | 'TEXT';
export type Language = 'EN' | 'FR';

export interface Post {
  id: string;
  network: Network;
  publishedAt: Date;
  postType: PostType;
  placement: string;
  text: string;
  url: string;
  impressions: number;
  reach: number | null;
  engagementRate: number; // Ratio 0-1
  shares: number;
  shareRatio: number; // Ratio 0-1
  engagements: number;
  language: Language;
  tags: string[];
}

export interface Filters {
  networks: Network[];
  postTypes: PostType[];
  placements: string[];
  selectedMonths: string[];
  tags: string[];
  language: Language | 'ALL';
  searchQuery: string;
  dateRange: { from: Date | undefined; to?: Date | undefined } | undefined;
}

export interface DashboardStats {
  totalPosts: number;
  totalImpressions: number;
  totalEngagements: number;
  avgEngagementRate: number; // (totalEngagements * 100) / totalImpressions
  avgShareRatio: number;     // (totalShares * 100) / totalEngagements
}
export interface FollowerDataPoint {
  date: Date;
  month: string; // Formatted as "December 2025"
  facebook: number;
  instagramEN: number;
  instagramFR: number;
  tiktokEN: number;
  tiktokFR: number;
  xEN: number;
  xFR: number;
  total: number; // Sum of all platforms
}
