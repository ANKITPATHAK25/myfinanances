# FinDash — Smart Financial Dashboard

A modern, responsive financial dashboard built with **Next.js**, **Tailwind CSS**, and **Shadcn UI**. Track spending, monitor income, and gain real-time financial insights.

## Features

- 📊 **Dashboard Overview** — Summary cards for balance, income, and expenses
- 📈 **Balance Chart** — Visual trend of your financial balance over time
- 🍩 **Spending Breakdown** — Category-based spending analysis
- 📝 **Transaction List** — Filterable, sortable transaction history with CSV/JSON export
- 💡 **Smart Insights** — AI-powered financial tips and observations
- 🌗 **Dark / Light Mode** — Automatic theme detection with manual toggle
- 👥 **Role Switcher** — Switch between Admin and Viewer perspectives

## Tech Stack

| Layer        | Technology                       |
| ------------ | -------------------------------- |
| Framework    | Next.js 16 (App Router)         |
| Styling      | Tailwind CSS 3 + CSS Variables  |
| Components   | Shadcn UI (Radix primitives)    |
| Charts       | Recharts                        |
| State        | React Context + TanStack Query  |
| Animations   | Framer Motion                   |
| Forms        | React Hook Form + Zod           |

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd breezy-budget-biz

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── app/               # Next.js App Router pages & layout
│   ├── layout.jsx     # Root layout with metadata & providers
│   ├── page.jsx       # Home page (Dashboard)
│   └── providers.jsx  # Client-side providers (Query, Toast, Tooltip)
├── components/
│   ├── dashboard/     # Dashboard-specific components
│   └── ui/            # Shadcn UI primitives
├── context/           # React Context (AppContext)
├── data/              # Mock data
├── hooks/             # Custom hooks (theme, mobile, toast)
└── lib/               # Utilities
```

## Deployment

This project is ready to deploy on **Vercel**, **Netlify**, or any Node.js hosting platform.
## License

MIT
