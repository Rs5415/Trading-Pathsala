
import { Course, LearningResourceItem, AnnouncementItem, WebsiteContent } from '../types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-1',
    slug: 'index-option-buying',
    name: 'Index Option Buying',
    category: 'Options',
    shortDescription: 'Master index options buying strategies, momentum triggers, strike selection, and disciplined stop-loss risk control.',
    fullDescription: 'Designed for traders focusing on Nifty and Bank Nifty index options. Learn how to time explosive momentum breakouts, select optimal strike prices, manage theta decay, and strictly budget risk.',
    price: 15000,
    image: '/images/course_option_buying_1793712656164.jpg',
    tags: ['Index Options', 'Nifty & Bank Nifty', 'Momentum', 'Strike Selection'],
    coverageTopics: [
      'Index Momentum & Breakout Triggers',
      'Option Buying Strike Selection (ITM, ATM, OTM)',
      'Managing Theta Decay & Delta Sensitivities',
      'Risk-to-Reward Ratio & Trade Invalidation'
    ],
    curriculum: [
      {
        moduleTitle: 'Module 1: Index Market Structure & Dynamics',
        lessons: ['Understanding Nifty & Bank Nifty Index Movements', 'Support, Resistance and Liquidity Zones']
      },
      {
        moduleTitle: 'Module 2: Option Buying Execution',
        lessons: ['Selecting High-Delta Strikes', 'Breakout & Pullback Entry Rules', 'Stop Loss & Trailing Profits']
      }
    ],
    featured: true
  },
  {
    id: 'course-2',
    slug: 'basic-to-advanced-technical-analysis',
    name: 'Basic to Advanced Technical Analysis',
    category: 'Technical Analysis',
    shortDescription: 'Covers Indian, Forex and Crypto markets. Topics include Order Flow, Volume Profile and MSS (Market Structure Shift).',
    fullDescription: 'Our flagship multi-market technical analysis curriculum. Learn institutional chart reading across Indian Equities, Forex, and Crypto using Order Flow, Volume Profile, and Market Structure Shift (MSS).',
    price: 30000,
    image: '/images/course_technical_analysis_1793416380606.jpg',
    tags: ['Technical Analysis', 'Order Flow', 'Volume Profile', 'MSS', 'Multi-Market'],
    coverageTopics: [
      'Indian Markets (Equities, Indices & Commodities)',
      'Forex Markets (Major Currency Pairs)',
      'Crypto Markets (Digital Assets)',
      'Order Flow Analysis (Bid-Ask Imbalances)',
      'Volume Profile (POC, Value Area High & Low)',
      'Market Structure Shift (MSS)'
    ],
    curriculum: [
      {
        moduleTitle: 'Module 1: Multi-Market Foundations',
        lessons: ['Price Action across Indian, Forex and Crypto Markets', 'Candlestick Anatomy & Multi-Timeframe Alignment']
      },
      {
        moduleTitle: 'Module 2: Advanced Institutional Concepts',
        lessons: ['Market Structure Shift (MSS) & Liquidity Sweeps', 'Order Flow Mechanics', 'Volume Profile Value Areas (POC, VAH, VAL)']
      }
    ],
    featured: true
  },
  {
    id: 'course-3',
    slug: 'option-selling',
    name: 'Option Selling (Advanced)',
    category: 'Options',
    shortDescription: 'Advanced option selling strategies, theta decay harvesting, margin optimization, and defensive adjustments.',
    fullDescription: 'Learn to trade like institutional writers using statistical probabilities and time decay. Covers credit spreads, iron condors, delta-neutral management, and firefighting adjustments.',
    price: 30000,
    image: '/images/course_options_derivatives_1793416378747.jpg',
    tags: ['Option Selling', 'Theta Harvesting', 'Credit Spreads', 'Risk Control'],
    coverageTopics: [
      'Option Greeks In-Depth (Delta, Theta, Vega)',
      'Directional & Non-Directional Credit Spreads',
      'Iron Condors & Straddles Execution',
      'Margin Optimization & Defensive Adjustments'
    ],
    curriculum: [
      {
        moduleTitle: 'Module 1: Principles of Option Writing',
        lessons: ['The Mathematics of Time Decay (Theta)', 'Implied Volatility Rank & Percentile', 'Exchange Margin Requirements']
      },
      {
        moduleTitle: 'Module 2: Adjustments & Risk Management',
        lessons: ['Rolling Strikes and Shifting Wings', 'Managing Volatility Expansion Events']
      }
    ],
    featured: true
  },
  {
    id: 'course-4',
    slug: 'how-to-plant-a-money-tree',
    name: 'How to Plant a Money Tree',
    category: 'Wealth & Investing',
    shortDescription: 'Long-term equity compounding, fundamental company evaluation, and disciplined wealth creation methodologies.',
    fullDescription: 'A disciplined financial education course guiding investors on building long-term sustainable wealth through equity compounding, fundamental analysis, and asset allocation.',
    price: 15000,
    image: '/images/course_money_tree_1793712671531.jpg',
    tags: ['Wealth Building', 'Compounding', 'Investing', 'Financial Planning'],
    coverageTopics: [
      'The Mathematics of Exponential Compounding',
      'Fundamental Company Analysis & Moat Evaluation',
      'Asset Allocation (Equities, Debt & Gold)',
      'Portfolio Rebalancing & Tax Efficiency'
    ],
    curriculum: [
      {
        moduleTitle: 'Module 1: Wealth Compounding Basics',
        lessons: ['Inflation & Purchasing Power Protection', 'The Rule of 72 & Long-term Horizons']
      },
      {
        moduleTitle: 'Module 2: Fundamental Equity Building',
        lessons: ['Reading Financial Statements & P&L', 'Identifying Quality Businesses']
      }
    ],
    featured: false
  },
  {
    id: 'course-5',
    slug: 'swing-trading',
    name: 'Swing Trading',
    category: 'Swing & Forex',
    shortDescription: 'Swing trading concepts, multi-day breakout setups, sector rotation, and positional risk control.',
    fullDescription: 'Designed for working professionals and positional traders. Learn systematic screeners, stage analysis, pullback entries, and disciplined trailing stop management.',
    price: 15000,
    image: '/images/course_price_action_1793416379591.jpg',
    tags: ['Swing Trading', 'Positional', 'Sector Rotation', 'Breakouts'],
    coverageTopics: [
      'Market Cycle & Stage Analysis',
      'Screening Relative Strength Stocks',
      'Pullback & Flag Breakout Entries',
      'Trailing Stops & Overnight Gap Management'
    ],
    curriculum: [
      {
        moduleTitle: 'Module 1: Swing Trading Framework',
        lessons: ['End-of-Day Screening Routines', 'Moving Average Interactions & Pullbacks']
      },
      {
        moduleTitle: 'Module 2: Execution & Position Sizing',
        lessons: ['Position Sizing per Trade Risk', 'Locking in Profits with Trailing Stops']
      }
    ],
    featured: false
  },
  {
    id: 'course-6',
    slug: 'forex-trading',
    name: 'Forex Trading',
    category: 'Swing & Forex',
    shortDescription: 'Forex market learning, major currency pairs, global macroeconomic sessions, and international risk management.',
    fullDescription: 'Explore the largest financial market in the world. Learn how central bank monetary policies, economic data releases, and interbank liquidity cycles drive currency pairs.',
    price: 20000,
    image: '/images/course_forex_trading_1793712685336.jpg',
    tags: ['Forex', 'Currency Pairs', 'Global Macro', 'Session Liquidity'],
    coverageTopics: [
      'Currency Pairs Hierarchy (Majors, Minors)',
      'London and New York Session Liquidity',
      'Economic Calendar Events (NFP, CPI)',
      'Strict Forex Leverage & Risk Governance'
    ],
    curriculum: [
      {
        moduleTitle: 'Module 1: Global Forex Architecture',
        lessons: ['Decentralized Interbank Market Basics', 'Calculating Pip Values and Account Leverage']
      },
      {
        moduleTitle: 'Module 2: Technical Strategies & Sessions',
        lessons: ['Trading London Open Breakouts', 'Strict 1% Risk Rule per Forex Trade']
      }
    ],
    featured: false
  }
];

export const INITIAL_RESOURCES: LearningResourceItem[] = [
  {
    id: 'res-1',
    title: 'Market Structure Shift (MSS) Comprehensive Study Guide',
    category: 'PDF Guide',
    fileSize: '3.4 MB',
    description: 'Detailed reference notes covering structure breaks, liquidity sweeps, and trend continuations across Indian indices and forex pairs.',
    dateAdded: '2025-11-01'
  },
  {
    id: 'res-2',
    title: 'Order Flow & Volume Profile Cheat Sheet',
    category: 'Trading Study Note',
    fileSize: '2.8 MB',
    description: 'Quick reference sheet for identifying Point of Control (POC), Value Area High/Low, and aggressive order flow imbalances.',
    dateAdded: '2025-11-03'
  },
  {
    id: 'res-3',
    title: 'Index Option Buying Risk Calculator & Journal Template',
    category: 'Course-related resources',
    fileSize: '1.5 MB XLSX',
    description: 'Structured spreadsheet for calculating position size, stop-loss distance, and daily risk budgeting.',
    dateAdded: '2025-11-10'
  },
  {
    id: 'res-4',
    title: 'Forex Trading Session Timing & Macro Calendar Guide',
    category: 'PDF Guide',
    fileSize: '2.1 MB',
    description: 'Timing reference for London, New York, and Asian sessions along with high-impact economic news releases.',
    dateAdded: '2025-11-15'
  }
];

export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-1',
    title: 'New Weekend Batch Announcement for Technical Analysis',
    date: 'November 2025',
    badge: 'New Batch',
    content: 'Admissions are now open for the upcoming weekend batch covering Basic to Advanced Technical Analysis including Order Flow and Volume Profile.'
  },
  {
    id: 'ann-2',
    title: 'Live Q&A Session with Prashant Kumar Sinha',
    date: 'This Saturday, 7:00 PM',
    badge: 'Live Webinar',
    content: 'All enrolled students are invited to join the live weekly Q&A session discussing index option momentum setups and student trade journals.'
  }
];

export const INITIAL_WEBSITE_CONTENT: WebsiteContent = {
  brandName: 'TRADING PATHSHALA',
  tagline: 'Learn • Practice • Grow',
  contactPerson: 'Prashant Kumar Sinha',
  officialPhone: '+91 89875 99799',
  whatsappNumber: '+91 89875 99799',
  supportEmail: 'support@tradingpathsala.in',
  instagramHandle: '@tradingpathsala',
  instagramUrl: 'https://www.instagram.com/tradingpathsala/',
  businessCategory: 'Stock Market Education & Trading Learning',
  officeAddress: 'Trading Pathshala, 3rd Floor, Mahadev Inn, Jalsar Road, Shivganga Muhalla, Deoghar, Jharkhand – 814112, India.',
  googleMapsDirectionsUrl: 'https://maps.google.com/?q=Trading+Pathshala+Mahadev+Inn+Jalsar+Road+Deoghar+Jharkhand+814112'
};
