import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { nanoid } from 'nanoid'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateShareToken(): string {
  return nanoid(16)
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatPercentage(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
}

export function calculatePortfolioValue(holdings: Array<{ quantity: number; currentPrice?: number }>, cash: number): number {
  const holdingsValue = holdings.reduce((total, holding) => {
    return total + (holding.quantity * (holding.currentPrice || 0))
  }, 0)
  
  return holdingsValue + cash
}

export function getSectorForTicker(ticker: string): string {
  // Mock sector mapping - in production, you'd use a real sector database
  const sectorMap: Record<string, string> = {
    'AAPL': 'Technology',
    'GOOGL': 'Technology',
    'MSFT': 'Technology',
    'TSLA': 'Automotive',
    'AMZN': 'Consumer Discretionary',
    'META': 'Technology',
    'NVDA': 'Technology',
    'NFLX': 'Communication Services',
    'SPY': 'ETF',
    'QQQ': 'ETF',
  }
  
  return sectorMap[ticker.toUpperCase()] || 'Other'
} 