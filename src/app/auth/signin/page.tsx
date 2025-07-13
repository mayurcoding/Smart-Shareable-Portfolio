'use client'

import { signIn, getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BarChart3 } from 'lucide-react'

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession()
      if (session) {
        router.push('/')
      } else {
        setIsLoading(false)
      }
    }
    checkSession()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="card p-8">
          <div className="text-center mb-8">
            <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to ValueMetrix
            </h1>
            <p className="text-gray-600">
              Sign in to create and share your AI-powered portfolios
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="btn btn-primary w-full"
            >
              Sign in with Google
            </button>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Demo Mode: Click any button to continue
              </p>
              <button
                onClick={() => router.push('/')}
                className="btn btn-outline w-full mt-4"
              >
                Continue as Demo User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 