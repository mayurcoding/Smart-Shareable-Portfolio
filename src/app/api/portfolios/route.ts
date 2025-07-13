import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateShareToken } from '@/lib/utils'
import { generatePortfolioInsights } from '@/lib/openai'
import { getMultipleStockQuotes } from '@/lib/stock-api'

// Mock portfolios for demo mode
const mockPortfolios = [
  {
    id: 'demo-1',
    name: 'Tech Growth Portfolio',
    description: 'A diversified technology-focused portfolio with growth stocks',
    visibility: 'SMART_SHARED' as const,
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
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    name: 'Balanced ETF Portfolio',
    description: 'A balanced portfolio using ETFs for broad market exposure',
    visibility: 'SMART_SHARED' as const,
    cash: 2500,
    shareToken: 'demo-share-2',
    holdings: [
      { id: 'h4', ticker: 'SPY', quantity: 15, currentPrice: 456.78, change: 1.23, changePercent: 0.27 },
      { id: 'h5', ticker: 'QQQ', quantity: 8, currentPrice: 378.45, change: 2.34, changePercent: 0.62 },
    ],
    insights: [
      {
        id: 'i3',
        type: 'PORTFOLIO_SUMMARY',
        title: 'ETF Portfolio Overview',
        content: 'This ETF-based portfolio provides broad market exposure with a total value of $9,234.45. The combination of SPY (S&P 500) and QQQ (NASDAQ-100) offers both stability and growth potential.'
      },
      {
        id: 'i4',
        type: 'RISK_ANALYSIS',
        title: 'Risk Assessment',
        content: 'The portfolio shows moderate risk with a focus on large-cap equities. The ETF structure provides built-in diversification, reducing individual stock risk while maintaining market exposure.'
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
]

export async function GET(request: NextRequest) {
  try {
    // For demo mode, return mock portfolios
    return NextResponse.json(mockPortfolios)
  } catch (error) {
    console.error('Error fetching portfolios:', error)
    return NextResponse.json(
      { error: 'Failed to fetch portfolios' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, holdings, cash, visibility } = body

    if (!name || !holdings || !Array.isArray(holdings)) {
      return NextResponse.json(
        { error: 'Invalid portfolio data' },
        { status: 400 }
      )
    }

    // Generate share token if visibility is SMART_SHARED
    const shareToken = visibility === 'SMART_SHARED' ? generateShareToken() : null

    // For demo mode, return a mock portfolio
    const mockPortfolio = {
      id: `demo-${Date.now()}`,
      name,
      description,
      cash: cash || 0,
      visibility,
      shareToken,
      holdings: holdings.map((holding: any, index: number) => ({
        id: `h${index}`,
        ticker: holding.ticker.toUpperCase(),
        quantity: parseFloat(holding.quantity),
        currentPrice: Math.random() * 100 + 50, // Mock price
        change: (Math.random() - 0.5) * 10,
        changePercent: (Math.random() - 0.5) * 5,
      })),
      insights: [
        {
          id: `i${Date.now()}`,
          type: 'PORTFOLIO_SUMMARY',
          title: 'Portfolio Overview',
          content: `This portfolio contains ${holdings.length} holdings with a total value of approximately $${(holdings.reduce((sum: number, h: any) => sum + parseFloat(h.quantity) * 100, 0) + (cash || 0)).toFixed(2)}. The portfolio shows good diversification across different securities.`
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(mockPortfolio, { status: 201 })
  } catch (error) {
    console.error('Error creating portfolio:', error)
    return NextResponse.json(
      { error: 'Failed to create portfolio' },
      { status: 500 }
    )
  }
} 