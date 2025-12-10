import Link from 'next/link'
import { getExercises, getWorkoutSessions } from '@/lib/cosmic'
import { Exercise, WorkoutSession } from '@/types'
import StatsCard from '@/components/StatsCard'
import RecentWorkouts from '@/components/RecentWorkouts'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const exercises = await getExercises() as Exercise[]
  const workoutSessions = await getWorkoutSessions() as WorkoutSession[]
  
  // Calculate statistics
  const totalWorkouts = workoutSessions.length
  const totalExercises = exercises.length
  
  // Get this week's workouts
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  
  const thisWeekWorkouts = workoutSessions.filter(workout => {
    const workoutDate = new Date(workout.metadata?.date || workout.created_at)
    return workoutDate >= oneWeekAgo
  }).length
  
  // Get recent workouts (last 5)
  const recentWorkouts = workoutSessions.slice(0, 5)
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-2xl">💪</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">GymTracker Pro</h1>
                <p className="text-sm text-gray-600">Smart Workout Tracking</p>
              </div>
            </div>
            
            <nav className="flex gap-4">
              <Link 
                href="/exercises" 
                className="px-4 py-2 text-gray-700 hover:text-primary transition-colors"
              >
                Exercises
              </Link>
              <Link 
                href="/workouts" 
                className="px-4 py-2 text-gray-700 hover:text-primary transition-colors"
              >
                Workouts
              </Link>
              <Link 
                href="/plans" 
                className="px-4 py-2 text-gray-700 hover:text-primary transition-colors"
              >
                Plans
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Workouts"
            value={totalWorkouts}
            icon="🏋️"
            color="blue"
          />
          <StatsCard
            title="This Week"
            value={thisWeekWorkouts}
            icon="📅"
            color="green"
          />
          <StatsCard
            title="Exercises"
            value={totalExercises}
            icon="💪"
            color="purple"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/workouts/new"
              className="flex items-center gap-3 p-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              <span className="text-2xl">➕</span>
              <div>
                <div className="font-semibold">Start Workout</div>
                <div className="text-sm opacity-90">Log new session</div>
              </div>
            </Link>
            
            <Link
              href="/exercises"
              className="flex items-center gap-3 p-4 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <span className="text-2xl">📚</span>
              <div>
                <div className="font-semibold">Browse Exercises</div>
                <div className="text-sm text-gray-600">View library</div>
              </div>
            </Link>
            
            <Link
              href="/plans"
              className="flex items-center gap-3 p-4 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <span className="text-2xl">🎯</span>
              <div>
                <div className="font-semibold">Workout Plans</div>
                <div className="text-sm text-gray-600">View templates</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Workouts */}
        <RecentWorkouts workouts={recentWorkouts} />
      </main>
    </div>
  )
}