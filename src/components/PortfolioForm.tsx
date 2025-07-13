'use client'

import { useState } from 'react'
import { Plus, X, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface Holding {
  ticker: string
  quantity: string
  averagePrice?: string
}

interface PortfolioFormProps {
  onSuccess: () => void
  onCancel: () => void
}

export default function PortfolioForm({ onSuccess, onCancel }: PortfolioFormProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [cash, setCash] = useState('')
  const [visibility, setVisibility] = useState<'PRIVATE' | 'PUBLIC' | 'SMART_SHARED'>('PRIVATE')
  const [holdings, setHoldings] = useState<Holding[]>([
    { ticker: '', quantity: '' }
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addHolding = () => {
    setHoldings([...holdings, { ticker: '', quantity: '' }])
  }

  const removeHolding = (index: number) => {
    if (holdings.length > 1) {
      setHoldings(holdings.filter((_, i) => i !== index))
    }
  }

  const updateHolding = (index: number, field: keyof Holding, value: string) => {
    const newHoldings = [...holdings]
    newHoldings[index] = { ...newHoldings[index], [field]: value }
    setHoldings(newHoldings)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) {
      toast.error('Portfolio name is required')
      return
    }

    if (holdings.some(h => !h.ticker.trim() || !h.quantity.trim())) {
      toast.error('Please fill in all holding details')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/portfolios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          cash: parseFloat(cash) || 0,
          visibility,
          holdings: holdings.map(h => ({
            ticker: h.ticker.trim().toUpperCase(),
            quantity: parseFloat(h.quantity),
            averagePrice: h.averagePrice ? parseFloat(h.averagePrice) : undefined,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create portfolio')
      }

      onSuccess()
    } catch (error) {
      console.error('Error creating portfolio:', error)
      toast.error('Failed to create portfolio')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="card p-6">
      <h3 className="text-xl font-semibold mb-4">Create New Portfolio</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Portfolio Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input w-full"
              placeholder="My Investment Portfolio"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cash Balance
            </label>
            <input
              type="number"
              value={cash}
              onChange={(e) => setCash(e.target.value)}
              className="input w-full"
              placeholder="0.00"
              step="0.01"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input w-full"
            rows={3}
            placeholder="Describe your investment strategy..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Visibility
          </label>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value as any)}
            className="input w-full"
            aria-label="Portfolio visibility"
          >
            <option value="PRIVATE">Private</option>
            <option value="PUBLIC">Public</option>
            <option value="SMART_SHARED">Smart Shared (Generate Share Link)</option>
          </select>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Holdings
            </label>
            <button
              type="button"
              onClick={addHolding}
              className="btn btn-outline btn-sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Holding
            </button>
          </div>
          
          <div className="space-y-3">
            {holdings.map((holding, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="text"
                  value={holding.ticker}
                  onChange={(e) => updateHolding(index, 'ticker', e.target.value)}
                  className="input flex-1"
                  placeholder="Ticker (e.g., AAPL)"
                  required
                />
                <input
                  type="number"
                  value={holding.quantity}
                  onChange={(e) => updateHolding(index, 'quantity', e.target.value)}
                  className="input w-24"
                  placeholder="Qty"
                  step="0.01"
                  required
                />
                <input
                  type="number"
                  value={holding.averagePrice || ''}
                  onChange={(e) => updateHolding(index, 'averagePrice', e.target.value)}
                  className="input w-32"
                  placeholder="Avg Price"
                  step="0.01"
                />
                {holdings.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeHolding(index)}
                    className="btn btn-outline btn-sm text-red-600 hover:text-red-700"
                    aria-label="Remove holding"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-outline"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Portfolio'}
          </button>
        </div>
      </form>
    </div>
  )
} 