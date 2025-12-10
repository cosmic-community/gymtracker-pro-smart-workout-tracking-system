import Link from 'next/link'
import { WorkoutSession } from '@/types'
import { format } from 'date-fns'

interface RecentWorkoutsProps {
  workouts: WorkoutSession[]
}

export default function RecentWorkouts({ workouts }: RecentWorkoutsProps) {
  if (!workouts || workouts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Workouts</h2>
        <div className="text-center py-8">
          <span className="text-4xl mb-2 block">🏋️</span>
          <p className="text-gray-600">No workouts yet. Start your fitness journey!</p>
          <Link
            href="/workouts/new"
            className="inline-block mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Start First Workout
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Recent Workouts</h2>
        <Link href="/workouts" className="text-primary hover:text-primary-dark text-sm font-medium">
          View All →
        </Link>
      </div>
      
      <div className="space-y-3">
        {workouts.map(workout => {
          const workoutDate = workout.metadata?.date ? new Date(workout.metadata.date) : new Date(workout.created_at)
          
          return (
            <div key={workout.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{workout.title}</h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                  <span>📅 {format(workoutDate, 'MMM dd, yyyy')}</span>
                  {workout.metadata?.duration && (
                    <span>⏱️ {workout.metadata.duration} min</span>
                  )}
                  {workout.metadata?.total_sets && (
                    <span>🏋️ {workout.metadata.total_sets} sets</span>
                  )}
                </div>
              </div>
              <span className="text-2xl">💪</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}