# KoinX - Tax Harvesting Dashboard

A React-based dashboard for cryptocurrency tax optimization. It visualizes your holdings and estimates capital gains before and after tax-loss harvesting.

## 🧾 Features

- 📊 **Capital Gains Cards**: View your short-term and long-term gains before and after harvesting.
- ✅ **Holdings Table**: Select which assets you want to harvest.
- 🧠 **Instant Tax Optimization Feedback**: See potential tax savings update in real time.
- 📌 **Tooltips and Disclaimers**: Clear guidance on how the dashboard works and legal notes.

## 🗂 Project Structure

```

src/
├── components/
│   ├── CapitalGains.jsx       # Capital gains summary cards
│   ├── Header.jsx             # App header with branding
│   └── Holdings.jsx           # Holdings table with selection checkboxes
├── services/
│   └── api.js                 # API call functions (assumed to exist)
├── App.jsx                    # Main app logic and state handling
└── main.jsx                   # React entry point

````

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/koinx-tax-harvesting.git
cd koinx-tax-harvesting
npm install
# or
yarn install
````

### Running Locally

```bash
npm run dev
# or
yarn dev
```

The app should be running at: `http://localhost:5173/` (if using Vite).

## 🧩 Component Overview

### `CapitalGains.jsx`

Displays two cards:

* Pre-harvesting capital gains (based on current holdings)
* Post-harvesting capital gains (based on user selections)

### `Holdings.jsx`

Interactive holdings table:

* Shows current price, gains, and amount to sell
* Users can check/uncheck assets to see impact on capital gains

### `Header.jsx`

Simple top navigation bar with app branding.

## 🔌 API Assumptions

Two async API methods are assumed in `services/api.js`:

```js
fetchHoldings()        // Returns holdings list with coin info and gains
fetchCapitalGains()    // Returns initial capital gains (pre-harvesting)
```


## 📋 Notes

* Data used for gains estimation comes from mock API or external services like Coingecko.
* This is a front-end only prototype and does not persist data or provide actual financial advice.


## ⚠️ Disclaimers

* Tax-loss harvesting rules vary by country. Consult a tax advisor.
* This is a simulated educational project and not a financial product.


## 📄 License

This project is licensed under the [MIT License](LICENSE).

