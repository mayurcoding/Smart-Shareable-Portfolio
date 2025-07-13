import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database'

export async function GET() {
  try {
    let dbHealth = {
      status: 'healthy',
      message: 'Database connection is working',
      timestamp: new Date(),
    }
    try {
      await prisma.$runCommandRaw({ ping: 1 })
    } catch (error) {
      dbHealth = {
        status: 'unhealthy',
        message: 'Database connection failed',
        timestamp: new Date(),
      }
    }
    
    const healthStatus = {
      status: dbHealth.status === 'healthy' ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      services: {
        database: dbHealth,
        api: {
          status: 'healthy',
          message: 'API is running',
          timestamp: new Date(),
        },
      },
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || '1.0.0',
    }

    // If database is unhealthy, return 503
    if (dbHealth.status === 'unhealthy') {
      return NextResponse.json(healthStatus, { status: 503 })
    }

    return NextResponse.json(healthStatus)
  } catch (error) {
    console.error('Health check failed:', error)
    
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
        services: {
          database: {
            status: 'unhealthy',
            message: 'Database health check failed',
            timestamp: new Date(),
          },
          api: {
            status: 'unhealthy',
            message: 'API health check failed',
            timestamp: new Date(),
          },
        },
      },
      { status: 500 }
    )
  }
} 