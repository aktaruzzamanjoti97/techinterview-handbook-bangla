'use client'

import { useState, useEffect, useMemo } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface Technology {
  name: string
  bgColor: string
  textColor: string
  href: string
  icon: string
}

interface SearchBarProps {
  technologies: Technology[]
  onFilter: (filteredTechs: Technology[]) => void
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

export default function SearchBar({ technologies, onFilter }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)

  const filteredTechnologies = useMemo(() => {
    if (!debouncedQuery.trim()) return technologies

    return technologies.filter(tech =>
      tech.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    )
  }, [technologies, debouncedQuery])

  useEffect(() => {
    onFilter(filteredTechnologies)
  }, [filteredTechnologies, onFilter])

  const clearSearch = () => {
    setQuery('')
  }

  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:text-gray-300" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search technologies..."
          className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-full text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm transition-all duration-200 hover:shadow-md"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}