import { Course, SpecialOffer, LearningResource, Testimonial, WebsiteContent, EducationalService } from '../types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-1',
    slug: 'stock-market-foundations-for-beginners',
    name: 'Stock Market Foundations & Investing Basics',
    category: 'Beginner',
    level: 'Beginner',
    shortDescription: 'Master financial market fundamentals, equity structure, trading account mechanics, and basic chart reading from zero.',
    fullDescription: 'Designed specifically for newcomers with zero prior background, this comprehensive program introduces the operational architecture of Indian and global stock exchanges. You will understand how equity markets function, what drives stock valuation, how orders are placed and matched via trading terminals, and how to safeguard capital through sound risk budgeting from day one.',
    duration: '4 Weeks (24 Hours)',
    price: 3499,
    originalPrice: 5999,
    image: '/src/assets/images/course_technical_analysis_1793416380606.jpg',
    tags: ['Equities', 'Market Basics', 'Beginner Friendly', 'Order Types'],
    highlights: [
      'Understanding primary and secondary equity markets (IPO vs secondary trading)',
      'Demat, Trading accounts, Depository Participants (NSDL & CDSL) setup',
      'Types of orders: Market, Limit, Stop-Loss, Bracket & Cover Orders',
      'Fundamental vs Technical analysis: key differences and synthesis',
      'Introduction to Japanese Candlesticks and volume dynamics',
      'Essential capital protection rules and emotional discipline'
    ],
    curriculum: [
      {
        moduleTitle: 'Module 1: Introduction to Financial Markets',
        lessons: [
          'How financial markets work: exchanges, brokers, regulators and clearing houses',
          'Market participants: Retail traders, Domestic institutions (DII), and Foreign institutions (FII)',
          'Indices demystified: How NIFTY 50 and SENSEX are weighted and calculated'
        ],
        duration: '6 Hours'
      },
      {
        moduleTitle: 'Module 2: Trading Terminals & Order Execution',
        lessons: [
          'Navigating real trading software: Market watch, market depth, bid-ask spreads',
          'Order execution masterclass: Intraday (MIS) vs Delivery (CNC)',
          'Stop-Loss orders: Trigger price vs Limit price explained with practical examples'
        ],
        duration: '6 Hours'
      },
      {
        moduleTitle: 'Module 3: Introduction to Charts & Candlesticks',
        lessons: [
          'Anatomy of a Candlestick: Open, High, Low, Close',
          'Single candlestick patterns: Hammer, Shooting Star, Marubozu, and Doji',
          'Timeframes for investors vs swing traders'
        ],
        duration: '6 Hours'
      },
      {
        moduleTitle: 'Module 4: Risk Management & Portfolio Allocation Basics',
        lessons: [
          'The Golden Rule: Never risk more than 1% to 2% on any single trade',
          'Calculating position size according to stop-loss distance',
          'Creating a personal paper-trading journal and evaluating trades'
        ],
        duration: '6 Hours'
      }
    ],
    prerequisites: 'No prior financial knowledge required. Just basic computer literacy and willingness to learn with discipline.',
    featured: true
  },
  {
    id: 'course-2',
    slug: 'price-action-trading-mastery',
    name: 'Price Action Trading & Market Structure',
    category: 'Intermediate',
    level: 'Intermediate',
    shortDescription: 'Learn to read raw candlestick charts without lagging indicators using support-resistance, market structure, and liquidity zones.',
    fullDescription: 'Strip away messy indicators and discover how institutional order flow impacts price movements. This course teaches you to decode raw price action on any timeframe: identify swing points, trend shifts, institutional liquidity pools, break-and-retest confirmations, and multi-timeframe alignment. You will learn to form structured trade hypotheses with measurable risk-reward ratios.',
    duration: '6 Weeks (36 Hours)',
    price: 5999,
    originalPrice: 8999,
    image: '/src/assets/images/course_price_action_1793416379591.jpg',
    tags: ['Price Action', 'Chart Patterns', 'Support & Resistance', 'Swing Trading'],
    highlights: [
      'Market structure identification: Higher Highs, Lower Lows, Break of Structure (BOS)',
      'Static vs Dynamic Support & Resistance levels with rejection confirmation',
      'Trendline analysis: Valid touch points, false breakouts vs genuine breakouts',
      'High-probability chart patterns: Head & Shoulders, Double Tops/Bottoms, Flags, Triangles',
      'Multi-timeframe analysis: Top-down alignment (Weekly -> Daily -> 1-Hour -> 15-Min)',
      'Trade management: Trailing stops, scaling out, and avoiding emotional exits'
    ],
    curriculum: [
      {
        moduleTitle: 'Module 1: Market Structure & Phase Analysis',
        lessons: [
          'Understanding trend cycles: Accumulation, Markup, Distribution, and Markdown',
          'Defining swings: Swing high, swing low, and trend invalidation levels',
          'Identifying true Break of Structure vs liquidity grabs (wicks vs closes)'
        ],
        duration: '8 Hours'
      },
      {
        moduleTitle: 'Module 2: Advanced Support & Resistance Zones',
        lessons: [
          'Zones vs single lines: Why price reacts to value areas',
          'Role reversal principles: Prior resistance turning into support',
          'Volume confirmation at key inflection levels'
        ],
        duration: '8 Hours'
      },
      {
        moduleTitle: 'Module 3: Candlestick Confirmation & Entry Triggers',
        lessons: [
          'Pin bars, Engulfing bars, and Inside bars in contextual confluence',
          'Breakout and retest confirmation checklists',
          'Filtering out low-probability false breakouts'
        ],
        duration: '10 Hours'
      },
      {
        moduleTitle: 'Module 4: Trade Execution, Risk-Reward & Journaling',
        lessons: [
          'Structuring 1:2 and 1:3 minimum risk-to-reward setups',
          'Managing trades during high-impact market news',
          'The Trading Pathshala trade log and post-market review protocol'
        ],
        duration: '10 Hours'
      }
    ],
    prerequisites: 'Basic familiarity with stock charts and trading software recommended.',
    featured: true
  },
  {
    id: 'course-3',
    slug: 'options-trading-derivatives-mentorship',
    name: 'Options Trading & Derivatives Risk Management',
    category: 'Advanced',
    level: 'Advanced',
    shortDescription: 'In-depth options education covering Calls, Puts, Option Greeks, Open Interest (OI) analysis, and defined-risk non-directional spreads.',
    fullDescription: 'Options are powerful derivative instruments, but trading them without deep risk comprehension is hazardous. This advanced curriculum dismantles options mechanics from the ground up: contract specifications, moneyness (ITM, ATM, OTM), Option Greeks (Delta, Gamma, Theta, Vega), implied volatility (IV), and Option Chain analysis. Emphasizes risk-defined strategies such as Credit Spreads, Iron Condors, and Hedging.',
    duration: '8 Weeks (48 Hours)',
    price: 7499,
    originalPrice: 11999,
    image: '/src/assets/images/course_options_derivatives_1793416378747.jpg',
    tags: ['Options Trading', 'Derivatives', 'Greeks', 'Hedging', 'Spread Strategies'],
    highlights: [
      'Call and Put options fundamentals: Buyers vs Sellers perspectives',
      'The Option Greeks: Delta, Gamma, Theta (Time Decay), Vega (Volatility), and Rho',
      'Option Chain & Open Interest (OI) data interpretation and Max Pain theory',
      'Implied Volatility (IV) and IV Rank / IV Percentile for strategy selection',
      'Directional option buying strategies vs non-directional option selling spreads',
      'Strict capital allocation and downside mitigation methods'
    ],
    curriculum: [
      {
        moduleTitle: 'Module 1: Derivatives Architecture & Contract Specs',
        lessons: [
          'Futures vs Options: Margin requirements, mark-to-market and leverage risks',
          'Payoff diagrams for Long Call, Short Call, Long Put, and Short Put',
          'Intrinsic value vs Extrinsic (time) value computation'
        ],
        duration: '12 Hours'
      },
      {
        moduleTitle: 'Module 2: The Option Greeks in Practice',
        lessons: [
          'Delta as probability and hedge ratio',
          'Theta decay: How time decay accelerates into expiry week',
          'Vega and Volatility Crush: Why buying options before earnings/events is risky'
        ],
        duration: '12 Hours'
      },
      {
        moduleTitle: 'Module 3: Option Chain & Open Interest (OI) Analysis',
        lessons: [
          'Reading Open Interest, change in OI, and Put-Call Ratio (PCR)',
          'Identifying institutional support and resistance clusters from strike concentrations',
          'Tracking intraday unwinding and short-covering moves'
        ],
        duration: '12 Hours'
      },
      {
        moduleTitle: 'Module 4: Defined-Risk Spreads & Position Adjustments',
        lessons: [
          'Bull Call Spread and Bear Put Spread setups',
          'Non-directional structures: Iron Condor and Iron Butterfly',
          'Adjustment frameworks when underlying price breaches boundary strikes'
        ],
        duration: '12 Hours'
      }
    ],
    prerequisites: 'Thorough understanding of cash market equities, price trends, and basic market terminology.',
    featured: true
  },
  {
    id: 'course-4',
    slug: 'technical-analysis-indicators-confluence',
    name: 'Technical Analysis & Multi-Indicator Confluence',
    category: 'Intermediate',
    level: 'Intermediate',
    shortDescription: 'Learn objective indicator analysis combining Moving Averages, RSI divergence, Volume Profile, and Fibonacci retracements.',
    fullDescription: 'Indicators are often misused as magic crystal balls. In this course, you will learn to use technical indicators as complementary lenses to objectively measure trend strength, momentum divergence, and participation volume. We focus on confluence trading—entering positions only when price action, momentum, and volume align simultaneously.',
    duration: '5 Weeks (30 Hours)',
    price: 4499,
    originalPrice: 6999,
    image: '/src/assets/images/course_technical_analysis_1793416380606.jpg',
    tags: ['Technical Indicators', 'RSI Divergence', 'Moving Averages', 'Fibonacci'],
    highlights: [
      'Exponential Moving Averages (20, 50, 200 EMA) for dynamic trend filters',
      'Relative Strength Index (RSI): Overbought/Oversold traps vs Bullish/Bearish Divergences',
      'Volume Profile analysis: Point of Control (POC), Value Area High & Low',
      'Fibonacci Retracement and Extension ratios (0.382, 0.5, 0.618 golden pocket)',
      'Building a rule-based trading checklist with clear execution rules',
      'Real historical chart case studies and systematic backtesting methods'
    ],
    curriculum: [
      {
        moduleTitle: 'Module 1: Trend Identification with Moving Averages',
        lessons: [
          'SMA vs EMA calculation and lag characteristics',
          'Golden Cross and Death Cross: Real significance vs retail myths',
          'Using EMA slope and price separation for trend strength measurement'
        ],
        duration: '6 Hours'
      },
      {
        moduleTitle: 'Module 2: Momentum & Divergence Trading',
        lessons: [
          'RSI calculation and standard periods',
          'Regular Divergence (trend reversal) vs Hidden Divergence (trend continuation)',
          'MACD histogram cycles and zero-line momentum flips'
        ],
        duration: '8 Hours'
      },
      {
        moduleTitle: 'Module 3: Volume & Fibonacci Confluence',
        lessons: [
          'Volume spread analysis: High volume churn vs low volume pullbacks',
          'Plotting Fibonacci retracements correctly across swing highs and lows',
          'Finding confluence zones where Fibonacci levels overlap key support/resistance'
        ],
        duration: '8 Hours'
      },
      {
        moduleTitle: 'Module 4: System Development & Strategy Testing',
        lessons: [
          'Formulating non-ambiguous entry, stop-loss, and target rules',
          'Manual backtesting methodology over 100 historical setups',
          'Handling drawdowns and maintaining psychological composure'
        ],
        duration: '8 Hours'
      }
    ],
    prerequisites: 'Basic knowledge of charting platforms like TradingView or broker software.',
    featured: false
  }
];

export const INITIAL_OFFERS: SpecialOffer[] = [
  {
    id: 'offer-1',
    title: 'New Batch Enrollment Grant',
    code: 'PATHSHALA20',
    description: 'Special fee waiver for aspiring traders joining the upcoming weekend cohort. Includes lifetime access to course video archives and class notes.',
    discount: '20% Flat Discount',
    validTill: '2026-11-15',
    applicableCourses: 'All Comprehensive & Intermediate Programs',
    isActive: true
  },
  {
    id: 'offer-2',
    title: 'Foundations & Price Action Bundle',
    code: 'DUOPACK',
    description: 'Enrol in both Stock Market Foundations and Price Action Trading Mastery together and save ₹3,000 on combined tuition.',
    discount: '₹3,000 Bundle Savings',
    validTill: '2026-11-30',
    applicableCourses: 'Stock Market Foundations + Price Action Mastery',
    isActive: true
  },
  {
    id: 'offer-3',
    title: 'Student & Academic Scholarship',
    code: 'CAMPUS30',
    description: 'Dedicated financial literacy concession for college students with valid student identity proof looking to build career-oriented market knowledge.',
    discount: '30% Student Concession',
    validTill: '2026-12-31',
    applicableCourses: 'All Beginner & Technical Analysis Courses',
    isActive: true
  }
];

export const INITIAL_RESOURCES: LearningResource[] = [
  {
    id: 'res-1',
    title: 'The Comprehensive Japanese Candlestick Reference Guide',
    category: 'Study Materials',
    readTime: '8 min read',
    summary: 'A structured breakdown of high-probability candlestick patterns with context, entry confirmation rules, and invalidation points.',
    tags: ['Candlesticks', 'Cheat Sheet', 'Price Action'],
    updatedAt: 'October 2026',
    downloadLabel: 'Candlestick_Reference_TradingPathshala.pdf',
    content: `### 1. Introduction: Context Over Pure Pattern
A candlestick in isolation provides minimal statistical edge. The true power of Japanese candlesticks arises solely when observed at high-value inflection zones (prior swing highs/lows, major support/resistance, or multi-day key levels).

### 2. High-Probability Reversal Signals
* **Bullish Pin Bar / Hammer**:
  - Anatomy: Small real body near the top of the range, long lower shadow at least 2x the body length, minimal upper shadow.
  - Psychology: Sellers pushed prices down aggressively, but aggressive buyers stepped in, rejecting lower prices before market close.
  - Execution Rule: Enter on the break of the hammer high; place stop-loss 1-2 ticks below the lowest wick.

* **Bearish Shooting Star**:
  - Anatomy: Small real body near the bottom of the range, long upper shadow at least 2x the body length.
  - Psychology: Buyers tried to break out to new highs but were met by heavy supply, forcing price back down.
  - Invalidation: If price closes above the high of the shooting star, the bearish premise is completely invalidated.

* **Bullish & Bearish Engulfing**:
  - Confirmation requirement: The body of the second candle must completely engulf the entire body of the preceding candle, backed by above-average volume.

### 3. Key Takeaway Checklist
1. Never trade a candlestick pattern in the middle of a consolidating range without clear support or resistance.
2. Always calculate your risk-reward before triggering the order.
3. Keep a trade log noting which patterns yield the highest win rate in your target instruments.`
  },
  {
    id: 'res-2',
    title: 'The Risk Management & Capital Allocation Handbook',
    category: 'Trading Guides',
    readTime: '10 min read',
    summary: 'Why risk management is the singular mathematical differentiator between surviving traders and those who deplete their accounts.',
    tags: ['Risk Management', 'Position Sizing', 'Drawdowns'],
    updatedAt: 'October 2026',
    downloadLabel: 'Risk_Management_Principles_Pathshala.pdf',
    content: `### 1. The Mathematics of Capital Preservation
When a trader experiences a 50% drawdown on their account, they require a 100% gain just to break even. A 20% drawdown requires a 25% gain. This asymmetric relationship makes downside control the paramount skill for longevity.

### 2. The 1% Risk Rule
The 1% rule mandates that on any single trade, your maximum allowed financial loss (if your stop-loss is hit) must never exceed 1% of your total trading capital.

* **Formula for Position Sizing**:
  \`\`\`
  Position Size (Quantity) = (Total Capital × Risk Percentage) / (Entry Price - Stop Loss Price)
  \`\`\`

* **Example Calculation**:
  - Capital: ₹2,00,000
  - 1% Max Risk: ₹2,000
  - Entry Price: ₹500
  - Stop Loss: ₹480
  - Risk Per Share: ₹20
  - Allowed Quantity: ₹2,000 / ₹20 = 100 Shares.

Regardless of whether the stock is volatile or steady, the financial damage upon stop-out remains strictly capped at ₹2,000.

### 3. Daily Loss Limits (Circuit Breaker)
Every disciplined trader must define a daily loss cap (typically 3% of capital). Once this threshold is crossed, trading is halted for the day to prevent revenge trading and emotional spiral.`
  },
  {
    id: 'res-3',
    title: 'Understanding Indian & Global Financial Market Structure',
    category: 'Market Basics',
    readTime: '6 min read',
    summary: 'The operational ecosystem of stock exchanges, depository systems, indices, and regulatory frameworks.',
    tags: ['Exchanges', 'NSE', 'BSE', 'Market Participants'],
    updatedAt: 'October 2026',
    downloadLabel: 'Market_Structure_Fundamentals.pdf',
    content: `### 1. The Exchange Ecosystem
In modern electronic stock markets, securities are bought and sold on national exchanges (such as the National Stock Exchange - NSE, and Bombay Stock Exchange - BSE).

* **The Depository System**:
  In India, physical share certificates have been replaced by electronic holding via NSDL (National Securities Depository Limited) and CDSL (Central Depository Services Limited). Your broker is merely an intermediary depository participant (DP).

### 2. Major Market Indices
* **NIFTY 50**: A free-float market capitalization-weighted index consisting of 50 of the largest and most liquid Indian companies across key sectors.
* **SENSEX**: The benchmark index of the BSE comprising 30 prominent blue-chip companies.
* Indices reflect aggregate market sentiment and economic health, providing a benchmark against which individual portfolio performance is evaluated.

### 3. Market Participants
* **Retail Participants**: Individual investors and traders.
* **Domestic Institutional Investors (DIIs)**: Mutual funds, pension funds, and insurance firms like LIC.
* **Foreign Portfolio Investors (FPIs / FIIs)**: Global funds deploying capital across emerging markets.`
  },
  {
    id: 'res-4',
    title: 'De-mystifying Support, Resistance & Breakout Confirmation',
    category: 'Technical Analysis',
    readTime: '7 min read',
    summary: 'How order flow, institutional memory, and liquidity clusters create dynamic support and resistance zones on charts.',
    tags: ['Support & Resistance', 'Price Action', 'Breakouts'],
    updatedAt: 'October 2026',
    downloadLabel: 'Support_Resistance_Guide.pdf',
    content: `### 1. What Really Causes Support and Resistance?
Support is not an arbitrary line drawn on a screen; it represents an area where buying interest is sufficiently strong to overcome selling pressure. Resistance is an area where supply outweighs demand.

### 2. The Principle of Role Reversal (Polartiy)
Once a strong resistance zone is decisively broken to the upside, it often flips into a support level on a subsequent pullback. Why?
* Traders who missed the initial breakout wait for a pullback to buy.
* Short sellers who were caught on the wrong side look to exit at breakeven when price re-tests the breakout price.

### 3. Avoiding the Trap of False Breakouts
* Do not enter merely because price touched a level during an intraday spike.
* Wait for the candle to close beyond the zone on your operative timeframe.
* Observe volume: genuine breakouts are accompanied by expanding volume, whereas false breakouts typically show declining volume.`
  },
  {
    id: 'res-5',
    title: 'Trading Psychology: Conquering Fear, Greed & FOMO',
    category: 'Educational Articles',
    readTime: '9 min read',
    summary: 'An honest guide to developing mental stamina, adhering to rules, and overcoming the psychological hurdles in market learning.',
    tags: ['Psychology', 'Discipline', 'Mindset'],
    updatedAt: 'October 2026',
    downloadLabel: 'Trading_Psychology_Framework.pdf',
    content: `### 1. Why Intellectual Knowledge Isn\'t Enough
Many individuals possess sound analytical skills yet struggle with trading because real financial risk activates primitive neurological fight-or-flight reactions. 

### 2. The Three Common Psychological Traps
* **FOMO (Fear of Missing Out)**: Entering trades after a massive rally has already occurred, precisely when informed traders are distributing shares to late retail participants.
* **Aversion to Accepting a Loss**: Refusing to honor a stop-loss because "it might come back," turning small, controlled losses into catastrophic drawdowns.
* **Revenge Trading**: Increasing position size immediately after a losing trade to quickly win back lost capital.

### 3. The Professional Mental Model
* Think in series of trades rather than single outcomes. Even a system with a 60% win rate will occasionally experience 4 to 5 consecutive losses.
* Grade yourself not on whether an individual trade was profitable, but on whether you executed your plan flawlessly.`
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Rajesh K. Verma',
    role: 'IT Consultant & Swing Learner',
    experienceLevel: 'Student Cohort',
    feedback: 'Before joining the Price Action program at Trading Pathshala, I was relying on random social media tips and crowded indicators. The structured curriculum on market structure and risk budgeting gave me a systematic, calm approach to reading charts.',
    courseTaken: 'Price Action Trading & Market Structure',
    isSample: true,
    rating: 5,
    date: 'September 2026'
  },
  {
    id: 'test-2',
    name: 'Ananya Deshmukh',
    role: 'Finance Graduate & Aspiring Analyst',
    experienceLevel: 'Foundations Cohort',
    feedback: 'The Stock Market Foundations course was exceptionally thorough. As a beginner, I was intimidated by trading platforms and order types. The mentor explanations were grounded in reality without any fake get-rich-quick hype.',
    courseTaken: 'Stock Market Foundations & Investing Basics',
    isSample: true,
    rating: 5,
    date: 'August 2026'
  },
  {
    id: 'test-3',
    name: 'Vikramaditya S.',
    role: 'Business Owner & Derivatives Enthusiast',
    experienceLevel: 'Options Mentorship',
    feedback: 'Options were always a black box of fear for me. The module breaking down Option Greeks with payoff curves and defined-risk spreads cleared my misconceptions completely. Very high quality educational material.',
    courseTaken: 'Options Trading & Derivatives Risk Management',
    isSample: true,
    rating: 5,
    date: 'October 2026'
  }
];

export const INITIAL_SERVICES: EducationalService[] = [
  {
    id: 'srv-1',
    title: 'Stock Market Education',
    focus: 'Equity & Market Architecture',
    description: 'Comprehensive curriculum covering national exchange mechanics, participant behavior, clearing operations, and long-term wealth preservation principles.',
    outcomes: [
      'Operational mechanics of primary and secondary markets',
      'Understanding regulatory oversight and investor safety',
      'Order book dynamics and liquidity depth interpretation'
    ]
  },
  {
    id: 'srv-2',
    title: 'Technical Analysis Learning',
    focus: 'Price Action & Chart Structure',
    description: 'Master the craft of reading raw candlestick charts, swing structure, trend reversals, dynamic support-resistance zones, and institutional footprint without lagging noise.',
    outcomes: [
      'Multi-timeframe trend analysis and market cycles',
      'High-probability candlestick and chart pattern validation',
      'Volume profile and liquidity pool identification'
    ]
  },
  {
    id: 'srv-3',
    title: 'Trading Strategies Education',
    focus: 'Rule-Based Execution & Risk Management',
    description: 'Systematic instruction on building objective trading plans with mathematically defined risk-to-reward ratios, drawdown controls, and strict capital allocation.',
    outcomes: [
      'Capital allocation with the strict 1%–2% risk rule',
      'Position sizing formulas tailored to stop-loss distance',
      'Disciplined trade journaling and psychological composure'
    ]
  },
  {
    id: 'srv-4',
    title: 'Market Fundamentals',
    focus: 'Financial Literacy & Valuation Context',
    description: 'Develop the analytical capability to understand corporate reports, balance sheets, macroeconomic indicators, interest rate cycles, and sector rotations.',
    outcomes: [
      'Key financial ratios (P/E, ROCE, Debt-to-Equity, Cash Flows)',
      'Understanding earnings seasons and economic announcements',
      'Differentiating long-term business value from short-term volatility'
    ]
  },
  {
    id: 'srv-5',
    title: 'Beginner Trading Education',
    focus: 'Zero-to-One Onboarding',
    description: 'Gentle, zero-jargon onboarding for newcomers. Learn demat and trading account navigation, order placement types (Market, Limit, SL, CNC, MIS), and practical safety.',
    outcomes: [
      'Hands-on walkthrough of modern broker trading software',
      'How stop-loss orders work and why they are non-negotiable',
      'Avoiding common beginner retail pitfalls and speculative tips'
    ]
  }
];

export const INITIAL_WEBSITE_CONTENT: WebsiteContent = {
  brandName: 'Trading Pathshala',
  tagline: 'Learn the Art of Trading',
  contactPerson: 'Prashant Kumar Sinha',
  officialPhone: '+91 89875 99799',
  whatsappNumber: '+91 89875 99799',
  instagramHandle: '@tradingpathsala',
  instagramUrl: 'https://www.instagram.com/tradingpathsala/',
  businessCategory: 'Financial Service, Financial Planner',
  announcementText: 'Official Batches Open — Learn the Art of Trading with Structured Mentorship',
  heroHeadline: 'LEARN THE ART OF TRADING',
  heroSubheading: 'Explore financial markets through structured trading education, market knowledge and practical learning resources.',
  officeAddress: 'Trading Pathshala\n3rd Floor, Mahadev Inn,\nJalsar Road, Shivganga Muhalla,\nDeoghar, Jharkhand – 814112, India.',
  googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Trading+Pathshala,+3rd+Floor,+Mahadev+Inn,+Jalsar+Road,+Shivganga+Muhalla,+Deoghar,+Jharkhand+814112,+India',
};

