# Smart Shareable Portfolio - ValueMetrix

A full-stack Next.js application that enables users to create AI-powered investment portfolios and share them securely with others via persistent links, even across devices, without requiring recipients to sign up.

## 🚀 Features

### Core Functionality
- **Portfolio Creation**: Create portfolios with holdings (tickers, quantities, cash)
- **Smart Shareable Links**: Generate secure, persistent links for portfolio sharing
- **No-Login Access**: Recipients can view shared portfolios without authentication
- **AI-Powered Insights**: Automatically generated portfolio analysis using OpenAI
- **Real-Time Data**: Mock stock prices with real-time updates
- **Cross-Device Persistence**: Access persists across sessions and devices

### AI Insights Generated
- Portfolio Summary
- Diversification Analysis
- Sector Exposure Analysis
- Risk Analysis
- Investment Thesis

### Security & Analytics
- Secure token generation using nanoid
- Access logging and analytics
- IP-based viewer tracking
- Persistent access across sessions

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (TypeScript)
- **Backend**: Next.js API Routes (TypeScript)
- **Database**: MongoDB with Prisma ORM
- **Authentication**: NextAuth.js
- **AI**: OpenAI GPT-4/3.5
- **Styling**: Tailwind CSS
- **UI Components**: Lucide React Icons
- **State Management**: React Hooks
- **Notifications**: React Hot Toast

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smartshareable
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="mongodb://localhost:27017/smartshareable"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"

   # OpenAI
   OPENAI_API_KEY="your-openai-api-key-here"

   # Stock API (using Alpha Vantage as example)
   ALPHA_VANTAGE_API_KEY="your-alpha-vantage-api-key-here"

   # Optional: Google OAuth (for NextAuth)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate

   # Push schema to database
   npm run db:push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗 Project Structure

```
smartshareable/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   ├── auth/          # NextAuth routes
│   │   │   └── portfolios/    # Portfolio CRUD operations
│   │   ├── portfolio/         # Shared portfolio view
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── PortfolioForm.tsx  # Portfolio creation form
│   │   └── PortfolioList.tsx  # Portfolio list display
│   └── lib/                   # Utility libraries
│       ├── auth.ts            # NextAuth configuration
│       ├── openai.ts          # OpenAI integration
│       ├── prisma.ts          # Database client
│       ├── stock-api.ts       # Stock data service
│       └── utils.ts           # Utility functions
├── prisma/
│   └── schema.prisma          # Database schema
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🗄 Database Schema

### Core Models
- **User**: Authentication and user data
- **Portfolio**: Portfolio metadata and settings
- **Holding**: Individual stock holdings
- **Insight**: AI-generated portfolio insights
- **SharedPortfolioAccess**: Track shared portfolio access
- **TokenAccessLog**: Detailed access logging

### Key Features
- **Secure Tokenization**: UUID-based share tokens
- **Access Persistence**: Cross-device access tracking
- **Analytics**: View tracking and usage statistics
- **Cascade Deletion**: Automatic cleanup of related data

## 🤖 AI Integration

### Prompt Design
The AI system uses a structured prompt to generate comprehensive portfolio insights:

```
You are a financial analyst at ValueMetrix, a research platform that combines AI insights and institutional-grade stock data for retail investors.

Analyze the following portfolio and provide insights in JSON format:

Portfolio Data:
[Portfolio holdings and cash data]

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

Be professional, data-driven, and provide actionable insights.
```

### Insight Types
- **PORTFOLIO_SUMMARY**: Overview of portfolio composition and value
- **DIVERSIFICATION_ANALYSIS**: Assessment of portfolio diversification
- **SECTOR_EXPOSURE**: Analysis of sector concentration and risks
- **RISK_ANALYSIS**: Risk assessment and volatility analysis
- **INVESTMENT_THESIS**: Strategic investment rationale

## 🔐 Security Features

### Share Token Security
- **Non-guessable**: Uses nanoid for secure token generation
- **Persistent**: Tokens don't expire unless manually revoked
- **Access Logging**: Tracks all access attempts and viewer data
- **IP Tracking**: Monitors access patterns for security

### Data Protection
- **User Isolation**: Users can only access their own portfolios
- **Share Control**: Portfolio owners control sharing permissions
- **Access Analytics**: Detailed logging of shared portfolio access

## 📊 Stock Data Integration

### Current Implementation
- **Mock Data**: Uses realistic mock stock data for demonstration
- **Real-time Updates**: Simulates real-time price updates
- **Sector Mapping**: Includes sector classification for analysis

### Production Ready
The application is designed to easily integrate with real stock APIs:
- **Alpha Vantage**: Ready-to-use integration
- **Finnhub**: Alternative data source
- **TwelveData**: High-frequency data option

## 🚀 Deployment

### Vercel Deployment
1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Environment Variables**: Add all required environment variables
3. **Database**: Set up MongoDB Atlas cluster
4. **Deploy**: Automatic deployment on push to main branch

### Environment Variables for Production
```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/smartshareable"
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-production-secret"
OPENAI_API_KEY="your-openai-api-key"
```

## 🔮 Future Enhancements

### Planned Features
- **Portfolio Revocation**: Allow creators to revoke shared access
- **Usage Analytics**: Enhanced viewer analytics and insights
- **Chat Interface**: Q&A chatbot for portfolio questions
- **Automated Updates**: Weekly insight regeneration
- **Real Stock Data**: Integration with live market data
- **Portfolio Templates**: Pre-built portfolio strategies
- **Social Features**: Portfolio sharing and discovery

### Technical Improvements
- **Real-time Updates**: WebSocket integration for live data
- **Advanced Analytics**: Performance tracking and benchmarking
- **Mobile Optimization**: Enhanced mobile experience
- **Offline Support**: PWA capabilities for offline access

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@valuemetrix.com or create an issue in this repository.

---

**Built with ❤️ for ValueMetrix** 