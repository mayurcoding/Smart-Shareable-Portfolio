import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface PortfolioData {
  holdings: Array<{
    ticker: string
    quantity: number
    currentPrice?: number
  }>
  cash: number
  totalValue: number
}

export async function generatePortfolioInsights(portfolioData: PortfolioData) {
  const prompt = `You are a financial analyst at ValueMetrix, a research platform that combines AI insights and institutional-grade stock data for retail investors.

Analyze the following portfolio and provide insights in JSON format:

Portfolio Data:
${JSON.stringify(portfolioData, null, 2)}

Please provide the following insights in JSON format:
1. Portfolio Summary (PORTFOLIO_SUMMARY)
2. Diversification Analysis (DIVERSIFICATION_ANALYSIS) 
3. Sector Exposure Analysis (SECTOR_EXPOSURE)
4. Risk Analysis (RISK_ANALYSIS)
5. Investment Thesis (INVESTMENT_THESIS)

For each insight, provide:
- title: A concise title
- content: Detailed analysis (2-3 paragraphs)

Focus on:
- Diversification assessment
- Sector concentration risks
- Overall portfolio risk profile
- Investment strategy evaluation
- Market positioning

Be professional, data-driven, and provide actionable insights.`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional financial analyst. Provide insights in JSON format only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error('No response from OpenAI')
    }

    // Try to parse JSON response
    try {
      return JSON.parse(response)
    } catch {
      // If JSON parsing fails, return structured insights
      return {
        insights: [
          {
            type: 'PORTFOLIO_SUMMARY',
            title: 'Portfolio Overview',
            content: response
          }
        ]
      }
    }
  } catch (error) {
    console.error('Error generating insights:', error)
    return {
      insights: [
        {
          type: 'PORTFOLIO_SUMMARY',
          title: 'Portfolio Overview',
          content: 'Unable to generate AI insights at this time. Please try again later.'
        }
      ]
    }
  }
} 