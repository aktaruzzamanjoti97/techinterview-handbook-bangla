'use client'

import { useState, useEffect, useMemo } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface SearchResult {
  id: string
  title: string
  description: string
  colorPref: string
  slug: string
}

interface SearchBarProps {
  data: SearchResult[]
  onResultClick?: (result: SearchResult) => void
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function SearchBar({ data, onResultClick }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const debouncedQuery = useDebounce(query, 300)

  const filteredResults = useMemo(() => {
    if (!debouncedQuery.trim()) return []

    return data.filter(item =>
      item.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(debouncedQuery.toLowerCase())
    ).slice(0, 5)
  }, [data, debouncedQuery])

  useEffect(() => {
    setIsOpen(debouncedQuery.length > 0 && filteredResults.length > 0)
  }, [debouncedQuery, filteredResults])

  const handleResultClick = (result: SearchResult) => {
    setQuery('')
    setIsOpen(false)
    onResultClick?.(result)
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(debouncedQuery.length > 0 && filteredResults.length > 0)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder="Search by title..."
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm transition-all duration-200 hover:shadow-md"
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredResults.map((result) => (
            <button
              key={result.id}
              onClick={() => handleResultClick(result)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors duration-150 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: result.colorPref }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {result.title}
                  </h3>
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {result.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}