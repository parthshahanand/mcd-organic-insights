import Papa from 'papaparse';
import dayjs from 'dayjs';
import { Post, Network, PostType, Language } from '@/types/post';

interface RawCSVRow {
    'Post ID': string;
    'Network': string;
    'Published time (America/Toronto)': string;
    'Post Type': string;
    'Placement': string;
    'Post text': string;
    'Post URL': string;
    'Impressions': string;
    'Reach': string;
    'Engagement rate avg.': string;
    'Shares': string;
    'Share Ratio': string;
    'Engagements': string;
    'French?': string;
    [key: string]: string; // For Label 1-19
}

export const parseCSV = (csvString: string): Post[] => {
    const result = Papa.parse(csvString, {
        header: true,
        skipEmptyLines: true,
    });

    return (result.data as RawCSVRow[]).map((row) => {
        // Extract tags from Label 1-19
        const tags: string[] = [];
        for (let i = 1; i <= 19; i++) {
            const labelValue = row[`Label ${i}`];
            if (labelValue && labelValue.trim()) {
                tags.push(labelValue.trim());
            }
        }

        const parsePercentage = (val: string): number => {
            if (!val) return 0;
            const parsed = parseFloat(val.replace('%', ''));
            return isNaN(parsed) ? 0 : parsed / 100;
        };

        const parseNumber = (val: string): number => {
            if (!val || val === '-') return 0;
            const parsed = parseInt(val.replace(/,/g, ''));
            return isNaN(parsed) ? 0 : parsed;
        };

        return {
            id: row['Post ID'],
            network: row['Network'] as Network,
            publishedAt: dayjs(row['Published time (America/Toronto)']).toDate(),
            postType: row['Post Type'] as PostType,
            placement: row['Placement'],
            text: row['Post text'] || '',
            url: row['Post URL'] || '',
            impressions: parseNumber(row['Impressions']),
            reach: row['Reach'] === '-' ? null : parseNumber(row['Reach']),
            engagementRate: parsePercentage(row['Engagement rate avg.']),
            shares: parseNumber(row['Shares']),
            shareRatio: parsePercentage(row['Share Ratio']),
            engagements: parseNumber(row['Engagements']),
            language: row['French?'] === 'FR' ? 'FR' : 'EN',
            tags: tags,
        };
    });
};

export const fetchAndParseData = async (): Promise<Post[]> => {
    try {
        const response = await fetch('/mcd-data.csv');
        if (!response.ok) {
            throw new Error(`Failed to fetch CSV: ${response.statusText}`);
        }
        const csvString = await response.text();
        return parseCSV(csvString);
    } catch (error) {
        console.error('Error fetching/parsing CSV data:', error);
        throw error;
    }
};
