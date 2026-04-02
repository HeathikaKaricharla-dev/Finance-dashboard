# Finance Dashboard
A clean and interactive finance dashboard built using React and Tailwind CSS to track financial activity and visualize spending patterns.

## Features
* Summary cards: Total Balance, Income, Expenses
* Charts:
  * Monthly income vs expenses (line chart)
  * Expense breakdown (pie chart)
* Transactions table with:
  * Date, Category, Type, Amount
* Search transactions by category
* Role-based UI:
  * Viewer can only view
  * Admin can add transactions + export data
* Insights:
  * Highest spending category
  * Monthly summary
* Dark mode toggle
* Export data as CSV and JSON

## Tech Stack
* React (Vite)
* Tailwind CSS
* Context API
* Recharts

## Setup Instructions
```bash
git clone https://github.com/HeathikaKaricharla-dev/finance-dashboard.git
cd finance-dashboard
npm install
npm run dev
```

## Approach
* Used Context API to manage transactions globally
* Built modular components (Dashboard, Transactions, Insights, Charts)
* Focused on clean UI and intuitive design
* Implemented role-based UI using state

## Role-Based Behavior
* Viewer: view-only access
* Admin: can add transactions and export data

## Notes
* Uses mock data (no backend)
* Built for frontend evaluation
* Easily extendable

## Optional Enhancements
* Dark mode
* Charts
* Export functionality
* Add transaction modal

