import Link from 'next/link'
import { getExercises } from '@/lib/cosmic'
import { Exercise } from '@/types'
import ExerciseCard from '@/components/ExerciseCard'
import CategoryFilter from '@/components/CategoryFilter'

export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function ExercisesPage({ searchParams }: PageProps) {
  const params = await searchParams
  const selectedCategory = params.category
  
  const allExercises = await getExercises() as Exercise[]
  
  // Filter by category if selected
  const exercises = selectedCategory
    ? allExercises.filter(ex => ex.metadata?.category === selectedCategory)
    : allExercises

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-primary hover:text-primary-dark text-sm mb-2 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Exercise Library</h1>
              <p className="text-gray-600 mt-1">Browse and learn exercises</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <CategoryFilter selectedCategory={selectedCategory} />

        {/* Exercises Grid */}
        {exercises.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🏋️</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No exercises found</h3>
            <p className="text-gray-600">
              {selectedCategory 
                ? `No exercises in the ${selectedCategory} category yet.`
                : 'Start by adding some exercises to your library.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map(exercise => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}