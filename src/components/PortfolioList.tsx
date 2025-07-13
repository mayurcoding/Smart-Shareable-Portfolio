'use client'

import { useState, useEffect } from 'react'
import { Share2, Eye, Settings, Trash2, BarChart3 } from 'lucide-react'
import toast from 'react-hot-toast'
import { formatCurrency } from '@/lib/utils'

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
  createdAt: string
  updatedAt: string
}

export default function PortfolioList() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPortfolios()
  }, [])

  const fetchPortfolios = async () => {
    try {
      const response = await fetch('/api/portfolios')
      if (!response.ok) {
        throw new Error('Failed to fetch portfolios')
      }
      const data = await response.json()
      setPortfolios(data)
    } catch (error) {
      console.error('Error fetching portfolios:', error)
      toast.error('Failed to load portfolios')
    } finally {
      setLoading(false)
    }
  }

  const copyShareLink = async (token: string) => {
    const shareUrl = `${window.location.origin}/portfolio/${token}`
    try {
      await navigator.clipboard.writeText(shareUrl)
      toast.success('Share link copied to clipboard!')
    } catch (error) {
      toast.error('Failed to copy link')
    }
  }

  const deletePortfolio = async (id: string) => {
    if (!confirm('Are you sure you want to delete this portfolio?')) {
      return
    }

    try {
      const response = await fetch(`/api/portfolios/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete portfolio')
      }

      setPortfolios(portfolios.filter(p => p.id !== id))
      toast.success('Portfolio deleted successfully')
    } catch (error) {
      console.error('Error deleting portfolio:', error)
      toast.error('Failed to delete portfolio')
    }
  }

  const calculateTotalValue = (portfolio: Portfolio) => {
    const holdingsValue = portfolio.holdings.reduce((total, holding) => {
      return total + (holding.quantity * (holding.currentPrice || 0))
    }, 0)
    return holdingsValue + portfolio.cash
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (portfolios.length === 0) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No portfolios yet</h3>
        <p className="text-gray-600">Create your first portfolio to get started</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {portfolios.map((portfolio) => {
        const totalValue = calculateTotalValue(portfolio)
        const totalHoldings = portfolio.holdings.length
        
        return (
          <div key={portfolio.id} className="card p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {portfolio.name}
                </h3>
                {portfolio.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {portfolio.description}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {portfolio.visibility === 'SMART_SHARED' && portfolio.shareToken && (
                  <button
                    onClick={() => copyShareLink(portfolio.shareToken!)}
                    className="btn btn-outline btn-sm"
                    title="Copy share link"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={() => window.open(`/portfolio/${portfolio.id}`, '_blank')}
                  className="btn btn-outline btn-sm"
                  title="View portfolio"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deletePortfolio(portfolio.id)}
                  className="btn btn-outline btn-sm text-red-600 hover:text-red-700"
                  title="Delete portfolio"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Value</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(totalValue)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Holdings</span>
                <span className="text-sm text-gray-900">{totalHoldings} stocks</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Cash</span>
                <span className="text-sm text-gray-900">
                  {formatCurrency(portfolio.cash)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Visibility</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  portfolio.visibility === 'PRIVATE' ? 'bg-gray-100 text-gray-700' :
                  portfolio.visibility === 'PUBLIC' ? 'bg-blue-100 text-blue-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {portfolio.visibility.replace('_', ' ')}
                </span>
              </div>
            </div>

            {portfolio.insights.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="text-sm font-medium text-gray-900 mb-2">AI Insights</h4>
                <div className="space-y-2">
                  {portfolio.insights.slice(0, 2).map((insight) => (
                    <div key={insight.id} className="text-xs text-gray-600">
                      <span className="font-medium">{insight.title}:</span> {insight.content.substring(0, 100)}...
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
} 