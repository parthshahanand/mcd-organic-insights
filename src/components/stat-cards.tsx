'use client';

import React from 'react';
import { useData } from '@/lib/data-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CountUp from 'react-countup';
import { FileText } from '@phosphor-icons/react/dist/ssr/FileText';
import { ChartBar } from '@phosphor-icons/react/dist/ssr/ChartBar';
import { CursorClick } from '@phosphor-icons/react/dist/ssr/CursorClick';
import { Percent } from '@phosphor-icons/react/dist/ssr/Percent';
import { ShareNetwork } from '@phosphor-icons/react/dist/ssr/ShareNetwork';

export const StatCards: React.FC = () => {
    const { stats } = useData();

    const cards = [
        {
            title: 'Total Posts',
            value: stats.totalPosts,
            icon: FileText,
            color: 'text-primary',
            bg: 'bg-primary/10',
            isPercentage: false,
        },
        {
            title: 'Total Impressions',
            value: stats.totalImpressions,
            icon: ChartBar,
            color: 'text-primary',
            bg: 'bg-primary/10',
            isPercentage: false,
        },
        {
            title: 'Total Engagements',
            value: stats.totalEngagements,
            icon: CursorClick,
            color: 'text-primary',
            bg: 'bg-primary/10',
            isPercentage: false,
        },
        {
            title: 'Avg. Engagement Rate',
            value: stats.avgEngagementRate,
            icon: Percent,
            color: 'text-primary',
            bg: 'bg-primary/10',
            isPercentage: true,
        },
        {
            title: 'Avg. Share Ratio',
            value: stats.avgShareRatio,
            icon: ShareNetwork,
            color: 'text-primary',
            bg: 'bg-primary/10',
            isPercentage: true,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {cards.map((card, i) => (
                <Card key={card.title} className="card-hover border-border/50 animate-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            {card.title}
                        </CardTitle>
                        <div className={`p-2 rounded-lg ${card.bg}`}>
                            <card.icon className={`w-4 h-4 ${card.color}`} />
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
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
