# MongoDB Atlas Setup Guide

This guide will walk you through setting up MongoDB Atlas for the Smart Shareable Portfolio application.

## 🚀 Step 1: Create MongoDB Atlas Account

1. **Visit MongoDB Atlas**
   - Go to [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Click "Try Free" or "Get Started"

2. **Sign Up**
   - Create an account or sign in with Google/GitHub
   - Choose "Build a new app" when prompted

## 🏗 Step 2: Create a Cluster

1. **Choose a Plan**
   - Select "FREE" tier (M0) for development
   - For production, consider M10 or higher

2. **Configure Cluster**
   - **Cloud Provider**: AWS, Google Cloud, or Azure
   - **Region**: Choose closest to your users
   - **Cluster Name**: `smartshareable-cluster`

3. **Create Cluster**
   - Click "Create Cluster"
   - Wait for cluster to be created (2-3 minutes)

## 🔐 Step 3: Set Up Database Access

1. **Create Database User**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - **Username**: `smartshareable-user`
   - **Password**: Generate a strong password
   - **Database User Privileges**: "Read and write to any database"
   - Click "Add User"

2. **Save Credentials**
   - Note down the username and password
   - You'll need these for the connection string

## 🌐 Step 4: Configure Network Access

1. **Add IP Address**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add specific IP addresses

2. **Security Note**
   - For production, only allow specific IPs
   - Vercel IPs: Add `0.0.0.0/0` temporarily, then restrict later

## 📊 Step 5: Get Connection String

1. **Connect to Cluster**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Select "Node.js" as driver
   - Copy the connection string

2. **Format Connection String**
   ```
   mongodb+srv://smartshareable-user:<password>@cluster0.xxxxx.mongodb.net/smartshareable?retryWrites=true&w=majority
   ```

## 🔧 Step 6: Update Environment Variables

1. **Local Development**
   Create `.env.local`:
   ```env
   DATABASE_URL="mongodb+srv://smartshareable-user:your-password@cluster0.xxxxx.mongodb.net/smartshareable?retryWrites=true&w=majority"
   ```

2. **Vercel Production**
   - Go to your Vercel project dashboard
   - Navigate to "Settings" → "Environment Variables"
   - Add `DATABASE_URL` with your connection string

## 🗄 Step 7: Initialize Database

1. **Generate Prisma Client**
   ```bash
   npm run db:generate
   ```

2. **Push Schema to Database**
   ```bash
   npm run db:push
   ```

3. **Verify Setup**
   - Go to MongoDB Atlas dashboard
   - Click "Browse Collections"
   - You should see your database and collections

## 🔍 Step 8: Test Connection

1. **Run Development Server**
   ```bash
   npm run dev
   ```

2. **Test Portfolio Creation**
   - Create a portfolio in the app
   - Check MongoDB Atlas to see if data appears

## 🛡 Step 9: Security Best Practices

1. **Database User Security**
   - Use strong, unique passwords
   - Consider using MongoDB Atlas built-in authentication

2. **Network Security**
   - Restrict IP access for production
   - Use VPC peering for enhanced security

3. **Backup Strategy**
   - Enable automated backups
   - Set up point-in-time recovery

4. **Monitoring**
   - Enable MongoDB Atlas monitoring
   - Set up alerts for performance issues

## 📈 Step 10: Production Considerations

1. **Scaling**
   - Monitor cluster performance
   - Upgrade to paid tier when needed
   - Consider dedicated clusters for high traffic

2. **Backup & Recovery**
   - Enable automated backups
   - Test recovery procedures
   - Document backup schedules

3. **Monitoring**
   - Set up performance alerts
   - Monitor query performance
   - Track storage usage

## 🚨 Troubleshooting

### Common Issues:

1. **Connection Refused**
   - Check IP whitelist
   - Verify connection string
   - Ensure database user exists

2. **Authentication Failed**
   - Verify username/password
   - Check database user privileges
   - Ensure correct database name

3. **Schema Push Fails**
   - Check Prisma schema syntax
   - Verify database permissions
   - Check for conflicting data

### Support Resources:
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [MongoDB Community Forums](https://developer.mongodb.com/community/forums/)

## ✅ Verification Checklist

- [ ] MongoDB Atlas account created
- [ ] Cluster created and running
- [ ] Database user created with proper permissions
- [ ] Network access configured
- [ ] Connection string obtained and formatted
- [ ] Environment variables updated
- [ ] Prisma client generated
- [ ] Database schema pushed
- [ ] Test connection successful
- [ ] Security measures implemented
- [ ] Backup strategy configured
- [ ] Monitoring enabled

## 🔗 Useful Links

- [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
- [Prisma Studio](https://www.prisma.io/studio) - Database GUI
- [MongoDB Compass](https://www.mongodb.com/products/compass) - MongoDB GUI
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

**Next Steps:**
1. Set up OpenAI API for AI insights
2. Configure real stock data APIs
3. Set up Google OAuth for authentication
4. Deploy to Vercel 