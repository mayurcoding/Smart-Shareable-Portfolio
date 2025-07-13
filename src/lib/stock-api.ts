import axios from 'axios'

// Mock stock data for demo purposes
const mockStockData: Record<string, { price: number; change: number; changePercent: number }> = {
  'AAPL': { price: 175.43, change: 2.15, changePercent: 1.24 },
  'GOOGL': { price: 142.56, change: -1.23, changePercent: -0.85 },
  'MSFT': { price: 378.85, change: 3.42, changePercent: 0.91 },
  'TSLA': { price: 248.50, change: -5.20, changePercent: -2.05 },
  'AMZN': { price: 145.24, change: 1.85, changePercent: 1.29 },
  'META': { price: 334.92, change: 4.67, changePercent: 1.41 },
  'NVDA': { price: 485.09, change: 12.34, changePercent: 2.61 },
  'NFLX': { price: 485.09, change: -2.15, changePercent: -0.44 },
  'SPY': { price: 456.78, change: 1.23, changePercent: 0.27 },
  'QQQ': { price: 378.45, change: 2.34, changePercent: 0.62 },
}

export interface StockQuote {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume?: number
  marketCap?: number
}

export async function getStockQuote(symbol: string): Promise<StockQuote | null> {
  try {
    // For demo purposes, use mock data
    // In production, you'd use a real stock API like Alpha Vantage, Finnhub, or TwelveData
    const mockData = mockStockData[symbol.toUpperCase()]
    
    if (!mockData) {
      // Generate random data for unknown symbols
      const basePrice = Math.random() * 100 + 50
      const change = (Math.random() - 0.5) * 10
      const changePercent = (change / basePrice) * 100
      
      return {
        symbol: symbol.toUpperCase(),
        price: basePrice,
        change,
        changePercent
      }
    }

    return {
      symbol: symbol.toUpperCase(),
      ...mockData
    }
  } catch (error) {
    console.error(`Error fetching stock quote for ${symbol}:`, error)
    return null
  }
}

export async function getMultipleStockQuotes(symbols: string[]): Promise<StockQuote[]> {
  const quotes = await Promise.all(
    symbols.map(symbol => getStockQuote(symbol))
  )
  
  return quotes.filter((quote): quote is StockQuote => quote !== null)
}

// Real API implementation (commented out for demo)
/*
export async function getStockQuote(symbol: string): Promise<StockQuote | null> {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    )
    
    const data = response.data['Global Quote']
    if (!data) return null
    
    return {
      symbol: data['01. symbol'],
      price: parseFloat(data['05. price']),
      change: parseFloat(data['09. change']),
      changePercent: parseFloat(data['10. change percent'].replace('%', '')),
      volume: parseInt(data['06. volume']),
      marketCap: parseFloat(data['08. market cap'])
    }
  } catch (error) {
    console.error(`Error fetching stock quote for ${symbol}:`, error)
    return null
  }
}
*/ 