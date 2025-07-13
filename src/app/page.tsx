'use client'

import { useState } from 'react'
import { Plus, BarChart3, Share2, Eye, Settings } from 'lucide-react'
import toast from 'react-hot-toast'
import PortfolioForm from '@/components/PortfolioForm'
import PortfolioList from '@/components/PortfolioList'
import { cn } from '@/lib/utils'

export default function HomePage() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [isDemoMode, setIsDemoMode] = useState(true)

  // Demo mode - skip authentication
  if (isDemoMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <BarChart3 className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-gray-900">
                  ValueMetrix Portfolio
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Demo Mode
                </span>
                <button
                  onClick={() => setIsDemoMode(false)}
                  className="btn btn-outline btn-sm"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Your Portfolios
                </h2>
                <p className="text-gray-600">
                  Create and manage your AI-powered investment portfolios
                </p>
              </div>
              <button
                onClick={() => setShowCreateForm(true)}
                className="btn btn-primary btn-md"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Portfolio
              </button>
            </div>

            {showCreateForm && (
              <div className="mb-8">
                <PortfolioForm
                  onSuccess={() => {
                    setShowCreateForm(false)
                    toast.success('Portfolio created successfully!')
                  }}
                  onCancel={() => setShowCreateForm(false)}
                />
              </div>
            )}

            <PortfolioList />
          </div>
        </main>
      </div>
    )
  }

  // Authentication required mode
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Smart Shareable Portfolio
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create AI-powered portfolios and share them securely with anyone, anywhere.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => setIsDemoMode(true)}
              className="btn btn-primary btn-lg"
            >
              Try Demo Mode
            </button>
            <div className="text-sm text-gray-500">
              No account required to view shared portfolios
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 