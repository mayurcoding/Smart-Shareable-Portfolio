'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { BarChart3, TrendingUp, TrendingDown, DollarSign, PieChart, Brain } from 'lucide-react'
import { formatCurrency, formatPercentage, calculatePortfolioValue, getSectorForTicker } from '@/lib/utils'

interface Holding {
  id: string
  ticker: string
  quantity: number
  averagePrice?: number
  currentPrice?: number
  change?: number
  changePercent?: number
}

interface Insight {
  id: string
  type: string
  title: string
  content: string
}

interface Portfolio {
  id: string
  name: string
  description?: string
  visibility: 'PRIVATE' | 'PUBLIC' | 'SMART_SHARED'
  cash: number
  shareToken?: string
  holdings: Holding[]
  insights: Insight[]
  user: {
    name?: string
    email?: string
  }
  createdAt: string
  updatedAt: string
}

export default function SharedPortfolioPage() {
  const params = useParams()
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.token) {
      fetchPortfolio(params.token as string)
    }
  }, [params.token])

  const fetchPortfolio = async (token: string) => {
    try {
      const response = await fetch(`/api/portfolios/share/${token}`)
      if (!response.ok) {
        throw new Error('Portfolio not found')
      }
      const data = await response.json()
      setPortfolio(data)
    } catch (error) {
      console.error('Error fetching portfolio:', error)
      setError('Portfolio not found or access denied')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Portfolio Not Found</h1>
          <p className="text-gray-600">The portfolio you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  const totalValue = calculatePortfolioValue(portfolio.holdings, portfolio.cash)
  const holdingsValue = totalValue - portfolio.cash

  // Calculate sector allocation
  const sectorAllocation = portfolio.holdings.reduce((acc, holding) => {
    const sector = getSectorForTicker(holding.ticker)
    const value = holding.quantity * (holding.currentPrice || 0)
    acc[sector] = (acc[sector] || 0) + value
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <BarChart3 className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {portfolio.name}
                </h1>
                <p className="text-sm text-gray-600">
                  Shared by {portfolio.user.name || portfolio.user.email}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(totalValue)}
              </div>
              <div className="text-sm text-gray-600">Total Value</div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {portfolio.description && (
            <div className="mb-8">
              <p className="text-gray-700">{portfolio.description}</p>
            </div>
          )}

          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <DollarSign className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold">Holdings Value</h3>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(holdingsValue)}
              </div>
              <div className="text-sm text-gray-600">
                {portfolio.holdings.length} holdings
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <DollarSign className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold">Cash</h3>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(portfolio.cash)}
              </div>
              <div className="text-sm text-gray-600">
                {((portfolio.cash / totalValue) * 100).toFixed(1)}% of portfolio
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <PieChart className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-semibold">Diversification</h3>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {Object.keys(sectorAllocation).length}
              </div>
              <div className="text-sm text-gray-600">Sectors</div>
            </div>
          </div>

          {/* Holdings Table */}
          <div className="card p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Holdings</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Ticker</th>
                    <th className="text-left py-3 px-4">Quantity</th>
                    <th className="text-left py-3 px-4">Current Price</th>
                    <th className="text-left py-3 px-4">Market Value</th>
                    <th className="text-left py-3 px-4">Change</th>
                    <th className="text-left py-3 px-4">Sector</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.holdings.map((holding) => {
                    const marketValue = holding.quantity * (holding.currentPrice || 0)
                    const weight = (marketValue / holdingsValue) * 100
                    
                    return (
                      <tr key={holding.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{holding.ticker}</td>
                        <td className="py-3 px-4">{holding.quantity.toLocaleString()}</td>
                        <td className="py-3 px-4">{formatCurrency(holding.currentPrice || 0)}</td>
                        <td className="py-3 px-4">{formatCurrency(marketValue)}</td>
                        <td className="py-3 px-4">
                          {holding.changePercent !== undefined && (
                            <div className="flex items-center space-x-1">
                              {holding.changePercent >= 0 ? (
                                <TrendingUp className="h-4 w-4 text-green-600" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-red-600" />
                              )}
                              <span className={holding.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}>
                                {formatPercentage(holding.changePercent)}
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {getSectorForTicker(holding.ticker)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Insights */}
          {portfolio.insights.length > 0 && (
            <div className="card p-6 mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <Brain className="h-6 w-6 text-purple-600" />
                <h3 className="text-xl font-semibold">AI-Powered Insights</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {portfolio.insights.map((insight) => (
                  <div key={insight.id} className="border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{insight.title}</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{insight.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sector Allocation */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-4">Sector Allocation</h3>
            <div className="space-y-3">
              {Object.entries(sectorAllocation)
                .sort(([, a], [, b]) => b - a)
                .map(([sector, value]) => {
                  const percentage = (value / holdingsValue) * 100
                  return (
                    <div key={sector} className="flex items-center justify-between">
                      <span className="text-gray-700">{sector}</span>
                      <div className="flex items-center space-x-4">
                        <div className="w-32 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`bg-primary h-2 rounded-full transition-all duration-300 progress-bar ${
                              percentage > 0 ? 'min-w-[1px]' : 'w-0'
                            }`}
                            style={{ '--progress-width': `${percentage}%` } as React.CSSProperties}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-20 text-right">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 