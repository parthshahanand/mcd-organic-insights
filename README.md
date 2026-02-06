<h1 align="center">🍟 McDonald's Organic Insights</h1>

<p align="center">
A social media analytics dashboard that turns CSV exports into interactive charts and tables.
</p>

<p align="center">
  <a href="https://mcd2025.vercel.app/">Live Demo</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#features">Features</a>
</p>

---

## About

This dashboard visualizes organic social media performance for **McDonald's Canada** across TikTok, Instagram, Facebook, and X. Upload a CSV export from your social listening tool, and the dashboard displays KPIs, trend charts, platform breakdowns, and a searchable content table.

Built for the **Cossette × McDonald's** marketing team.

---

## Features

- **Stat Cards** — Total followers, posts, impressions, engagements, and engagement rate
- **Follower Trends** — Line chart showing monthly growth by platform, with EN/FR language toggle
- **Performance Chart** — Area chart for any metric over time (daily, weekly, monthly)
- **Network Breakdown** — Donut chart comparing metrics across platforms
- **Advanced Filters** — Filter by network, post type, placement, tags, date range, or search term
- **Content Table** — Sortable, paginated table with boosted post highlighting

---

## Screenshots

<p align="center">
  <img src="docs/screenshots/dashboard-overview.png" width="800" alt="Dashboard Overview" />
  <br />
  <em>Performance analytics and platform breakdowns</em>
</p>

<p align="center">
  <img src="docs/screenshots/filter-interactions.png" width="800" alt="Filter Interactions" />
  <br />
  <em>Dynamic filtering by date, network, and tags</em>
</p>

<p align="center">
  <img src="docs/screenshots/content-table.png" width="800" alt="Content Table" />
  <br />
  <em>Detailed content inventory with engagement metrics</em>
</p> 

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4, shadcn/ui |
| Charts | Recharts |
| Icons | HugeIcons |
| CSV Parsing | PapaParse |
| Date Handling | Day.js |
| Language | TypeScript 5 |

---

## Getting Started

### Prerequisites

- Node.js 18.17+
- npm 9+ or pnpm 8+

### Installation

```bash
git clone https://github.com/PastasaurusRex/mcd-organic-insights.git
cd mcd-organic-insights
npm install
```

### Add Your Data

Place your CSV in `public/mcd-data.csv`. Required columns:

```
Network, Post Type, Published At, Placement, Reach, Impressions, 
Engagements, Engagement Rate, Shares, Text, URL, Language, Tags
```

For follower data, add `public/mcd-followers.csv` with monthly follower counts by platform.

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm start
```

---

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Dashboard components
│   ├── stat-cards.tsx
│   ├── followers-chart.tsx
│   ├── performance-chart.tsx
│   ├── network-breakdown.tsx
│   ├── filters-bar.tsx
│   ├── posts-table.tsx
│   └── ui/           # shadcn/ui primitives
├── lib/              # Data context and utilities
└── types/            # TypeScript interfaces
```

---

## Acknowledgments

- Built with [Google Antigravity](https://www.google.com/)
- Icons by [HugeIcons](https://hugeicons.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)

---

## License

All rights reserved. © 2025 Cossette × McDonald's.

---

<p align="center">
<sub>Last reviewed: January 2025</sub>
</p>