'use client';

import React from 'react';
import { useData } from '@/lib/data-context';
import { Network, PostType } from '@/types/post';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    GlobalIcon,
    SmartPhone01Icon,
    Location01Icon,
    Tag01Icon,
    Calendar01Icon,
    Cancel01Icon
} from '@hugeicons/core-free-icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import dayjs from 'dayjs';

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export const FiltersBar: React.FC = () => {
    const { filters, setFilters, allPlacements, allTags } = useData();

    const toggleNetwork = (network: Network) => {
        setFilters(prev => ({
            ...prev,
            networks: prev.networks.includes(network)
                ? prev.networks.filter(n => n !== network)
                : [...prev.networks, network]
        }));
    };

    const togglePostType = (type: PostType) => {
        setFilters(prev => ({
            ...prev,
            postTypes: prev.postTypes.includes(type)
                ? prev.postTypes.filter(t => t !== type)
                : [...prev.postTypes, type]
        }));
    };

    const togglePlacement = (placement: string) => {
        setFilters(prev => ({
            ...prev,
            placements: prev.placements.includes(placement)
                ? prev.placements.filter(p => p !== placement)
                : [...prev.placements, placement]
        }));
    };

    const toggleMonth = (month: string) => {
        setFilters(prev => ({
            ...prev,
            selectedMonths: prev.selectedMonths.includes(month)
                ? prev.selectedMonths.filter(m => m !== month)
                : [...prev.selectedMonths, month]
        }));
    };

    const toggleTag = (tag: string) => {
        setFilters(prev => ({
            ...prev,
            tags: prev.tags.includes(tag)
                ? prev.tags.filter(t => t !== tag)
                : [...prev.tags, tag]
        }));
    };

    const resetFilters = () => {
        setFilters({
            networks: [],
            postTypes: [],
            placements: [],
            selectedMonths: [],
            tags: [],
            language: 'ALL',
            searchQuery: '',
            dateRange: undefined,
        });
    };

    return (
        <div className="space-y-4 animate-in" style={{ animationDelay: '200ms' }}>
            <div className="flex flex-wrap items-center gap-3">
                {/* Network Filter */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-9 gap-2">
                            <HugeiconsIcon icon={GlobalIcon} size={16} />
                            Network
                            {filters.networks.length > 0 && (
                                <Badge variant="secondary" className="ml-1 rounded-sm px-1 font-normal">
                                    {filters.networks.length}
                                </Badge>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[200px]">
                        <DropdownMenuLabel>Social Platforms</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {['TIKTOK', 'INSTAGRAM', 'FACEBOOK', 'TWITTER'].map((n) => (
                            <DropdownMenuCheckboxItem
                                key={n}
                                checked={filters.networks.includes(n as Network)}
                                onCheckedChange={() => toggleNetwork(n as Network)}
                            >
                                {n}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Post Type Filter */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-9 gap-2">
                            <HugeiconsIcon icon={SmartPhone01Icon} size={16} />
                            Post Type
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[200px]">
                        <DropdownMenuLabel>Content Format</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {['VIDEO', 'IMAGE', 'REELS', 'CAROUSEL', 'TEXT'].map((t) => (
                            <DropdownMenuCheckboxItem
                                key={t}
                                checked={filters.postTypes.includes(t as PostType)}
                                onCheckedChange={() => togglePostType(t as PostType)}
                            >
                                {t}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Placement Filter */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-9 gap-2">
                            <HugeiconsIcon icon={Location01Icon} size={16} />
                            Placement
                            {filters.placements.length > 0 && (
                                <Badge variant="secondary" className="ml-1 rounded-sm px-1 font-normal">
                                    {filters.placements.length}
                                </Badge>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[200px]">
                        <DropdownMenuLabel>Ad Placement</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {allPlacements.map((p) => (
                            <DropdownMenuCheckboxItem
                                key={p}
                                checked={filters.placements.includes(p)}
                                onCheckedChange={() => togglePlacement(p)}
                            >
                                {p}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Campaign Tags Filter */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="h-9 gap-2">
                            <HugeiconsIcon icon={Tag01Icon} size={16} />
                            Campaign Tags
                            {filters.tags.length > 0 && (
                                <Badge variant="secondary" className="ml-1 rounded-sm px-1 font-normal">
                                    {filters.tags.length}
                                </Badge>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-[320px] p-4">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Filter by Tags</h4>
                                {filters.tags.length > 0 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 px-2 text-[9px] font-bold uppercase tracking-tighter"
                                        onClick={() => setFilters(prev => ({ ...prev, tags: [] }))}
                                    >
                                        Clear
                                    </Button>
                                )}
                            </div>
                            <ScrollArea className="h-[240px]">
                                <div className="flex flex-wrap gap-2 pr-4">
                                    {allTags.length > 0 ? (
                                        allTags.map((tag) => {
                                            const isSelected = filters.tags.includes(tag);
                                            return (
                                                <button
                                                    key={tag}
                                                    onClick={() => toggleTag(tag)}
                                                    className={cn(
                                                        "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border",
                                                        isSelected
                                                            ? "bg-emerald-500 text-white border-emerald-600"
                                                            : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300"
                                                    )}
                                                >
                                                    {tag}
                                                </button>
                                            );
                                        })
                                    ) : (
                                        <div className="w-full py-8 text-center text-xs text-muted-foreground uppercase font-bold tracking-widest">
                                            No tags found
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                        </div>
                    </PopoverContent>
                </Popover>

                {/* Date Range Filter */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                                "h-9 justify-start text-left font-bold text-[11px] uppercase tracking-wider gap-2 border-border/50",
                                !filters.dateRange && "text-muted-foreground"
                            )}
                        >
                            <HugeiconsIcon icon={Calendar01Icon} size={16} />
                            {filters.dateRange?.from ? (
                                filters.dateRange.to ? (
                                    <>
                                        {dayjs(filters.dateRange.from).format("MMM DD")} -{" "}
                                        {dayjs(filters.dateRange.to).format("MMM DD")}
                                    </>
                                ) : (
                                    dayjs(filters.dateRange.from).format("MMM DD")
                                )
                            ) : (
                                <span>Date Range</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={filters.dateRange?.from}
                            selected={filters.dateRange}
                            onSelect={(range) => setFilters(prev => ({ ...prev, dateRange: range }))}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>

                {/* Language Filter */}
                <div className="flex bg-muted/50 rounded-lg p-1 border border-border/50">
                    {(['ALL', 'EN', 'FR'] as const).map((lang) => (
                        <Button
                            key={lang}
                            variant={filters.language === lang ? 'secondary' : 'ghost'}
                            size="sm"
                            className={`h-7 px-3 text-[11px] font-bold transition-all ${filters.language === lang ? 'bg-background shadow-sm border border-border/50' : 'text-muted-foreground'
                                }`}
                            onClick={() => setFilters(f => ({ ...f, language: lang }))}
                        >
                            {lang}
                        </Button>
                    ))}
                </div>

                {/* Reset */}
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 text-muted-foreground hover:text-destructive transition-colors"
                    onClick={resetFilters}
                >
                    <HugeiconsIcon icon={Cancel01Icon} size={16} className="mr-2" />
                    Reset All
                </Button>
            </div>

            {/* Month Selector */}
            <div className="relative">
                <ScrollArea className="w-full">
                    <div className="flex gap-2 pb-2">
                        {MONTHS.map((month) => {
                            const isSelected = filters.selectedMonths.includes(month);
                            return (
                                <Button
                                    key={month}
                                    variant={isSelected ? 'default' : 'outline'}
                                    size="sm"
                                    className={`h-8 px-4 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${isSelected
                                        ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20'
                                        : 'text-muted-foreground hover:border-primary/50'
                                        }`}
                                    onClick={() => toggleMonth(month)}
                                >
                                    {month}
                                </Button>
                            );
                        })}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    );
};
