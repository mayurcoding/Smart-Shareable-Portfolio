import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: {
        id: params.id,
      },
      include: {
        holdings: true,
        insights: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    if (!portfolio) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(portfolio)
  } catch (error) {
    console.error('Error fetching portfolio:', error)
    return NextResponse.json(
      { error: 'Failed to fetch portfolio' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, holdings, cash, visibility } = body

    // Check if user owns the portfolio
    const existingPortfolio = await prisma.portfolio.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingPortfolio || existingPortfolio.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Update portfolio
    const updatedPortfolio = await prisma.portfolio.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        description,
        cash: cash || 0,
        visibility,
      },
      include: {
        holdings: true,
        insights: true,
      },
    })

    return NextResponse.json(updatedPortfolio)
  } catch (error) {
    console.error('Error updating portfolio:', error)
    return NextResponse.json(
      { error: 'Failed to update portfolio' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user owns the portfolio
    const existingPortfolio = await prisma.portfolio.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingPortfolio || existingPortfolio.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Delete portfolio (cascade will delete holdings and insights)
    await prisma.portfolio.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting portfolio:', error)
    return NextResponse.json(
      { error: 'Failed to delete portfolio' },
      { status: 500 }
    )
  }
} 