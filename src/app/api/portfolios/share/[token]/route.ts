import { NextRequest, NextResponse } from 'next/server'

// Mock shared portfolios for demo mode
const mockSharedPortfolios = {
  'demo-share-1': {
    id: 'demo-1',
    name: 'Tech Growth Portfolio',
    description: 'A diversified technology-focused portfolio with growth stocks',
    visibility: 'SMART_SHARED',
    cash: 5000,
    shareToken: 'demo-share-1',
    holdings: [
      { id: 'h1', ticker: 'AAPL', quantity: 10, currentPrice: 175.43, change: 2.15, changePercent: 1.24 },
      { id: 'h2', ticker: 'GOOGL', quantity: 5, currentPrice: 142.56, change: -1.23, changePercent: -0.85 },
      { id: 'h3', ticker: 'MSFT', quantity: 8, currentPrice: 378.85, change: 3.42, changePercent: 0.91 },
    ],
    insights: [
      {
        id: 'i1',
        type: 'PORTFOLIO_SUMMARY',
        title: 'Portfolio Overview',
        content: 'This tech-focused portfolio shows strong diversification across major technology companies with a total value of $8,234.65. The portfolio maintains a healthy cash position of 37.8% while investing in established tech leaders.'
      },
      {
        id: 'i2',
        type: 'DIVERSIFICATION_ANALYSIS',
        title: 'Diversification Assessment',
        content: 'The portfolio demonstrates good sector diversification within the technology space, with exposure to hardware (Apple), software (Microsoft), and internet services (Google). However, consider adding non-tech sectors for better risk management.'
      },
      {
        id: 'i3',
        type: 'SECTOR_EXPOSURE',
        title: 'Sector Analysis',
        content: 'The portfolio is heavily concentrated in the technology sector, which provides growth potential but also increases sector-specific risk. Consider diversifying into other sectors like healthcare, finance, or consumer goods.'
      },
      {
        id: 'i4',
        type: 'RISK_ANALYSIS',
        title: 'Risk Assessment',
        content: 'This portfolio shows moderate to high risk due to its technology focus. While tech stocks offer growth potential, they can be volatile. The cash position provides some downside protection.'
      },
      {
        id: 'i5',
        type: 'INVESTMENT_THESIS',
        title: 'Investment Strategy',
        content: 'This portfolio follows a growth-oriented strategy focused on established technology leaders. The approach leverages the continued digital transformation and innovation in the tech sector.'
      }
    ],
    user: {
      name: 'Demo User',
      email: 'demo@valuemetrix.com'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  'demo-share-2': {
    id: 'demo-2',
    name: 'Balanced ETF Portfolio',
    description: 'A balanced portfolio using ETFs for broad market exposure',
    visibility: 'SMART_SHARED',
    cash: 2500,
    shareToken: 'demo-share-2',
    holdings: [
      { id: 'h4', ticker: 'SPY', quantity: 15, currentPrice: 456.78, change: 1.23, changePercent: 0.27 },
      { id: 'h5', ticker: 'QQQ', quantity: 8, currentPrice: 378.45, change: 2.34, changePercent: 0.62 },
    ],
    insights: [
      {
        id: 'i6',
        type: 'PORTFOLIO_SUMMARY',
        title: 'ETF Portfolio Overview',
        content: 'This ETF-based portfolio provides broad market exposure with a total value of $9,234.45. The combination of SPY (S&P 500) and QQQ (NASDAQ-100) offers both stability and growth potential.'
      },
      {
        id: 'i7',
        type: 'DIVERSIFICATION_ANALYSIS',
        title: 'Diversification Assessment',
        content: 'The ETF structure provides excellent diversification across hundreds of companies. SPY offers broad market exposure while QQQ focuses on technology and growth companies.'
      },
      {
        id: 'i8',
        type: 'SECTOR_EXPOSURE',
        title: 'Sector Analysis',
        content: 'This portfolio provides exposure to all major sectors through SPY, with additional technology exposure through QQQ. This creates a well-balanced sector allocation.'
      },
      {
        id: 'i9',
        type: 'RISK_ANALYSIS',
        title: 'Risk Assessment',
        content: 'The portfolio shows moderate risk with a focus on large-cap equities. The ETF structure provides built-in diversification, reducing individual stock risk while maintaining market exposure.'
      },
      {
        id: 'i10',
        type: 'INVESTMENT_THESIS',
        title: 'Investment Strategy',
        content: 'This portfolio follows a passive investment strategy using ETFs to capture broad market returns while minimizing costs and individual stock risk.'
      }
    ],
    user: {
      name: 'Demo User',
      email: 'demo@valuemetrix.com'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const portfolio = mockSharedPortfolios[params.token as keyof typeof mockSharedPortfolios]

    if (!portfolio) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      )
    }

    // Log access (in demo mode, just return the portfolio)
    console.log(`Portfolio accessed via token: ${params.token}`)

    return NextResponse.json(portfolio)
  } catch (error) {
    console.error('Error fetching shared portfolio:', error)
    return NextResponse.json(
      { error: 'Failed to fetch portfolio' },
      { status: 500 }
    )
  }
} 