import Link from 'next/link'
import WorkoutForm from '@/components/WorkoutForm'

export default function NewWorkoutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/workouts" className="text-primary hover:text-primary-dark text-sm mb-2 inline-block">
            ← Back to Workouts
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">New Workout Session</h1>
          <p className="text-gray-600 mt-1">Log your workout details</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WorkoutForm />
      </main>
    </div>
  )
}