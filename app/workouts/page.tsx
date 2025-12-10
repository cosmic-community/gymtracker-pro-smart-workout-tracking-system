import Link from 'next/link'
import { getWorkoutSessions } from '@/lib/cosmic'
import { WorkoutSession } from '@/types'
import WorkoutCard from '@/components/WorkoutCard'

export const dynamic = 'force-dynamic'

export default async function WorkoutsPage() {
  const workouts = await getWorkoutSessions() as WorkoutSession[]

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
              <h1 className="text-3xl font-bold text-gray-900">Workout History</h1>
              <p className="text-gray-600 mt-1">View all your workout sessions</p>
            </div>
            
            <Link
              href="/workouts/new"
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold"
            >
              + New Workout
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {workouts.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🏋️</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No workouts yet</h3>
            <p className="text-gray-600 mb-6">Start tracking your fitness journey today!</p>
            <Link
              href="/workouts/new"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold"
            >
              Start Your First Workout
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map(workout => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}