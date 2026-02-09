'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useData } from '@/lib/data-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CountUp from 'react-countup';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Note01Icon,
    CursorPointer01Icon,
    Comment01Icon,
    PercentIcon,
    Share01Icon,
    UserGroupIcon,
    Facebook01Icon,
    InstagramIcon,
    TiktokIcon,
    NewTwitterIcon
} from '@hugeicons/core-free-icons';
import Papa from 'papaparse';
import dayjs from 'dayjs';

interface FollowerCSVRow {
    Date: string;
    'FB followers': string;
    'IGEN followers': string;
    'IGFR followers': string;
    'TTEN followers': string;
    'TTFR followers': string;
    'XEN followers': string;
    'XFR followers': string;
}

export const StatCards: React.FC = () => {
    const { stats, filters } = useData();
    const [followerData, setFollowerData] = useState<FollowerCSVRow[]>([]);

    useEffect(() => {
        fetch('/mcd-followers.csv')
            .then(res => res.text())
            .then(csv => {
                const result = Papa.parse<FollowerCSVRow>(csv, { header: true, skipEmptyLines: true });
                // Exclude December 2024 data
                const filteredData = result.data.filter(row => {
                    const d = dayjs(row.Date);
                    return !(d.month() === 11 && d.year() === 2024);
                });
                setFollowerData(filteredData);
            });
    }, []);

    const followerStats = useMemo(() => {
        if (followerData.length === 0) return { value: 0, label: '...', icon: UserGroupIcon };

        // Determine which month to show (most recent by default, or selected)
        let targetRow;
        if (filters.selectedMonths.length === 1) {
            targetRow = followerData.find(row => dayjs(row.Date).format('MMMM') === filters.selectedMonths[0]);
        }

        // Default to most recent month if no single month selected
        if (!targetRow) {
            targetRow = followerData[followerData.length - 1];
        }

        if (!targetRow) return { value: 0, label: '...', icon: UserGroupIcon };

        const monthLabel = dayjs(targetRow.Date).format('MMMM YYYY');

        // Calculate total based on network filters
        let total = 0;
        const selectedNetworks = filters.networks;
        const noFilter = selectedNetworks.length === 0;

        if (noFilter || selectedNetworks.includes('FACEBOOK')) {
            total += parseInt(targetRow['FB followers']) || 0;
        }
        if (noFilter || selectedNetworks.includes('INSTAGRAM')) {
            total += (parseInt(targetRow['IGEN followers']) || 0) + (parseInt(targetRow['IGFR followers']) || 0);
        }
        if (noFilter || selectedNetworks.includes('TIKTOK')) {
            total += (parseInt(targetRow['TTEN followers']) || 0) + (parseInt(targetRow['TTFR followers']) || 0);
        }
        if (noFilter || selectedNetworks.includes('TWITTER')) {
            total += (parseInt(targetRow['XEN followers']) || 0) + (parseInt(targetRow['XFR followers']) || 0);
        }

        // Determine icon
        let icon = UserGroupIcon;
        if (selectedNetworks.length === 1) {
            if (selectedNetworks[0] === 'FACEBOOK') icon = Facebook01Icon;
            else if (selectedNetworks[0] === 'INSTAGRAM') icon = InstagramIcon;
            else if (selectedNetworks[0] === 'TIKTOK') icon = TiktokIcon;
            else if (selectedNetworks[0] === 'TWITTER') icon = NewTwitterIcon;
        }

        return { value: total, label: `as of ${monthLabel}`, icon };
    }, [followerData, filters.selectedMonths, filters.networks]);

    const cards = [
        {
            title: 'Total Followers',
            value: followerStats.value,
            icon: followerStats.icon,
            color: 'text-primary',
            bg: 'bg-primary/10',
            isPercentage: false,
            subcopy: followerStats.label,
        },
        {
            title: 'Total Posts',
            value: stats.totalPosts,
            icon: Note01Icon,
            color: 'text-primary',
            bg: 'bg-primary/10',
            isPercentage: false,
        },
        {
            title: 'Total Impressions',
            value: stats.totalImpressions,
            icon: CursorPointer01Icon,
            color: 'text-primary',
            bg: 'bg-primary/10',
            isPercentage: false,
        },
        {
            title: 'Total Engagements',
            value: stats.totalEngagements,
            icon: Comment01Icon,
            color: 'text-primary',
            bg: 'bg-primary/10',
            isPercentage: false,
        },
        {
            title: 'Avg. Engagement Rate',
            value: stats.avgEngagementRate,
            icon: PercentIcon,
            color: 'text-primary',
            bg: 'bg-primary/10',
            isPercentage: true,
        },
        {
            title: 'Avg. Share Ratio',
            value: stats.avgShareRatio,
            icon: Share01Icon,
            color: 'text-primary',
            bg: 'bg-primary/10',
            isPercentage: true,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {cards.map((card, i) => (
                <Card key={card.title} className="card-hover border-border/50 animate-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            {card.title}
                        </CardTitle>
                        <div className={`p-2 rounded-lg ${card.bg}`}>
                            <HugeiconsIcon icon={card.icon} size={16} className={card.color} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold tracking-tight">
                            <CountUp
                                end={card.value}
                                duration={2}
                                separator=","
                                decimals={card.isPercentage ? 2 : 0}
                                suffix={card.isPercentage ? '%' : ''}
                            />
                        </div>
                        {card.subcopy && (
                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1 opacity-70">
                                {card.subcopy}
                            </p>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
