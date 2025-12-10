'use client'

import Link from 'next/link'

interface CategoryFilterProps {
  selectedCategory?: string
}

export default function CategoryFilter({ selectedCategory }: CategoryFilterProps) {
  const categories = [
    { name: 'All', value: undefined },
    { name: 'Strength', value: 'Strength' },
    { name: 'Cardio', value: 'Cardio' },
    { name: 'Flexibility', value: 'Flexibility' }
  ]

  return (
    <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
      {categories.map(category => {
        const isActive = category.value === selectedCategory || (!category.value && !selectedCategory)
        const href = category.value ? `/exercises?category=${category.value}` : '/exercises'
        
        return (
          <Link
            key={category.name}
            href={href}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              isActive
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {category.name}
          </Link>
        )
      })}
    </div>
  )
}