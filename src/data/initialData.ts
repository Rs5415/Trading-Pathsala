import { Course, WebsiteContent } from '../types';
import optionBuyingImg from '../assets/images/course_option_buying_1793712656164.jpg';
import techAnalysisImg from '../assets/images/course_technical_analysis_1793416380606.jpg';
import optionSellingImg from '../assets/images/course_options_derivatives_1793416378747.jpg';
import moneyTreeImg from '../assets/images/course_money_tree_1793712671531.jpg';
import swingTradingImg from '../assets/images/course_price_action_1793416379591.jpg';
import forexTradingImg from '../assets/images/course_forex_trading_1793712685336.jpg';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-1',
    slug: 'index-option-buying',
    name: 'Index Option Buying',
    category: 'Options',
    shortDescription: 'Master index option buying momentum, strike selection, breakout timing, and disciplined risk-to-reward parameters.',
    fullDescription: 'Focus on index option buying dynamics in Nifty and Bank Nifty. Learn momentum identification, strike price selection, entry triggers, stop-loss placement, and trade management.',
    price: 15000,
    image: optionBuyingImg,
    tags: ['Index Options', 'Nifty', 'Momentum', 'Buying'],
    coverageTopics: [
      'Index Momentum & Breakout Triggers',
      'Option Buying Strike Selection',
      'Risk-to-Reward and Trade Invalidation'
    ],
    curriculum: [
      {
        moduleTitle: 'Module 1: Index Market Structure',
        lessons: ['Index Behavior & Trend Identification', 'Support, Resistance & Breakouts']
      },
      {
        moduleTitle: 'Module 2: Option Buying Execution',
        lessons: ['Selecting High-Probability Strikes', 'Managing Risk & Stop Losses']
      }
    ]
  },
  {
    id: 'course-2',
    slug: 'basic-to-advanced-technical-analysis',
    name: 'Basic to Advanced Technical Analysis',
    category: 'Technical Analysis',
    shortDescription: 'Covers Indian, Forex and Crypto markets, Order Flow, Volume Profile and MSS (Market Structure Shift).',
    fullDescription: 'Complete foundational to advanced technical analysis program covering Indian Markets, Forex Markets, Crypto Markets, Order Flow, Volume Profile, and Market Structure Shift (MSS).',
    price: 30000,
    image: techAnalysisImg,
    tags: ['Technical Analysis', 'Order Flow', 'Volume Profile', 'MSS'],
    coverageTopics: [
      'Indian Markets (Equities & Indices)',
      'Forex Markets (Major Pairs)',
      'Crypto Markets',
      'Order Flow Analysis',
      'Volume Profile (POC & Value Area)',
      'Market Structure Shift (MSS)'
    ],
    curriculum: [
      {
        moduleTitle: 'Module 1: Chart Reading & Multi-Market Analysis',
        lessons: ['Indian, Forex and Crypto Market Structure', 'Price Action & Candlestick Analysis']
      },
      {
        moduleTitle: 'Module 2: Order Flow, Volume Profile & MSS',
        lessons: ['Volume Profile & Point of Control', 'Order Flow Imbalances', 'Market Structure Shift (MSS)']
      }
    ]
  },
  {
    id: 'course-3',
    slug: 'option-selling',
    name: 'Option Selling',
    category: 'Options',
    shortDescription: 'Systematic option writing, theta decay harvesting, margin optimization, and defensive adjustments.',
    fullDescription: 'Learn disciplined option selling strategies including credit spreads, straddles, iron condors, margin management, and defensive adjustments for volatile sessions.',
    price: 30000,
    image: optionSellingImg,
    tags: ['Option Selling', 'Theta Decay', 'Spreads', 'Risk Control'],
    coverageTopics: [
      'Option Greeks & Time Decay (Theta)',
      'Directional & Non-Directional Spreads',
      'Margin Safety & Position Adjustments'
    ],
    curriculum: [
      {
        moduleTitle: 'Module 1: Option Selling Principles',
        lessons: ['Option Writing Edge & Theta Decay', 'Credit Spreads & Iron Condors']
      },
      {
        moduleTitle: 'Module 2: Risk Management & Adjustments',
        lessons: ['Firefighting & Adjusting Trending Trades', 'Margin Optimization']
      }
    ]
  },
  {
    id: 'course-4',
    slug: 'how-to-plant-a-money-tree',
    name: 'How to Plant a Money Tree',
    category: 'Wealth & Investing',
    shortDescription: 'Long-term equity compounding, fundamental company evaluation, and disciplined wealth creation principles.',
    fullDescription: 'A structured approach to building long-term wealth through equity compounding, fundamental analysis, asset allocation, and disciplined portfolio management.',
    price: 15000,
    image: moneyTreeImg,
    tags: ['Wealth Building', 'Compounding', 'Investing', 'Portfolio'],
    coverageTopics: [
      'Power of Long-Term Compounding',
      'Fundamental Company Analysis',
      'Asset Allocation & Portfolio Discipline'
    ],
    curriculum: [
      {
        moduleTitle: 'Module 1: Wealth Compounding Basics',
        lessons: ['Principles of Compounding & Inflation', 'Long-term Financial Planning']
      },
      {
        moduleTitle: 'Module 2: Equity Portfolio Construction',
        lessons: ['Analyzing Quality Businesses', 'Portfolio Diversification & Review']
      }
    ]
  },
  {
    id: 'course-5',
    slug: 'swing-trading',
    name: 'Swing Trading',
    category: 'Swing & Forex',
    shortDescription: 'Multi-day momentum setups, chart pattern breakouts, and systematic positional trade management.',
    fullDescription: 'Designed for traders looking to capture multi-day price swings. Learn chart screening, stage analysis, pullback entries, trailing stop losses, and position sizing.',
    price: 15000,
    image: swingTradingImg,
    tags: ['Swing Trading', 'Momentum', 'Breakouts', 'Positional'],
    coverageTopics: [
      'Stage Analysis & Trend Identification',
      'High-Probability Swing Setups & Breakouts',
      'Trailing Stop Losses & Risk Budgeting'
    ],
    curriculum: [
      {
        moduleTitle: 'Module 1: Swing Trading Framework',
        lessons: ['Stock Screening & Watchlist Building', 'Pattern Breakouts & Pullbacks']
      },
      {
        moduleTitle: 'Module 2: Trade Execution & Position Sizing',
        lessons: ['Setting Risk per Trade', 'Trailing Stops & Taking Profits']
      }
    ]
  },
  {
    id: 'course-6',
    slug: 'forex-trading',
    name: 'Forex Trading',
    category: 'Swing & Forex',
    shortDescription: 'Currency pair analysis, global macroeconomic sessions, pip calculations, and international forex risk management.',
    fullDescription: 'Learn how to trade international currency markets. Covers major forex pairs, global trading sessions, economic calendar drivers, and strict leverage management.',
    price: 20000,
    image: forexTradingImg,
    tags: ['Forex', 'Currency Pairs', 'Global Macro', 'Session Liquidity'],
    coverageTopics: [
      'Currency Pairs & Pips Mechanics',
      'London and New York Session Liquidity',
      'Forex Risk & Leverage Governance'
    ],
    curriculum: [
      {
        moduleTitle: 'Module 1: Forex Market Architecture',
        lessons: ['Understanding Currency Pairs & Spreads', 'Global Market Sessions & Timing']
      },
      {
        moduleTitle: 'Module 2: Forex Execution & Strategy',
        lessons: ['Technical Setups in EUR/USD & GBP/USD', 'Strict Leverage & Risk Rules']
      }
    ]
  }
];

export const INITIAL_WEBSITE_CONTENT: WebsiteContent = {
  brandName: 'Trading Pathsala',
  tagline: 'Learn the Art of Trading',
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
