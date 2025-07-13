#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 MongoDB Atlas Setup Helper');
console.log('==============================\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
const envExists = fs.existsSync(envPath);

if (envExists) {
  console.log('✅ .env.local file found');
} else {
  console.log('📝 Creating .env.local file...');
  
  const envTemplate = `# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/smartshareable?retryWrites=true&w=majority"

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
`;

  fs.writeFileSync(envPath, envTemplate);
  console.log('✅ .env.local file created');
}

console.log('\n📋 Setup Instructions:');
console.log('1. Go to https://www.mongodb.com/atlas');
console.log('2. Create a free account');
console.log('3. Create a new cluster (M0 Free tier)');
console.log('4. Set up database access:');
console.log('   - Username: smartshareable-user');
console.log('   - Password: Generate a strong password');
console.log('   - Privileges: Read and write to any database');
console.log('5. Configure network access:');
console.log('   - Add IP Address: 0.0.0.0/0 (for development)');
console.log('6. Get your connection string:');
console.log('   - Click "Connect" on your cluster');
console.log('   - Choose "Connect your application"');
console.log('   - Select "Node.js"');
console.log('   - Copy the connection string');
console.log('7. Update DATABASE_URL in .env.local with your connection string');
console.log('8. Run: npm run db:generate');
console.log('9. Run: npm run db:push');
console.log('10. Test: npm run dev');

console.log('\n🔗 Useful Links:');
console.log('- MongoDB Atlas: https://cloud.mongodb.com/');
console.log('- Setup Guide: docs/mongodb-atlas-setup.md');
console.log('- Prisma Studio: npx prisma studio');

console.log('\n⚠️  Important Security Notes:');
console.log('- Use strong passwords for database users');
console.log('- For production, restrict IP access');
console.log('- Enable MongoDB Atlas monitoring');
console.log('- Set up automated backups');

console.log('\n✅ Next Steps:');
console.log('1. Follow the setup instructions above');
console.log('2. Update your .env.local file');
console.log('3. Test the connection');
console.log('4. Deploy to Vercel with environment variables'); 