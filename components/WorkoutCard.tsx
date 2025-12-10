import { WorkoutSession } from '@/types'
import { format } from 'date-fns'

interface WorkoutCardProps {
  workout: WorkoutSession
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  const workoutDate = workout.metadata?.date 
    ? new Date(workout.metadata.date) 
    : new Date(workout.created_at)

  const statusColors = {
    'Completed': 'bg-green-100 text-green-700',
    'In Progress': 'bg-yellow-100 text-yellow-700',
    'Planned': 'bg-blue-100 text-blue-700'
  }

  const status = workout.metadata?.status || 'Completed'

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{workout.title}</h3>
          <p className="text-sm text-gray-600">
            {format(workoutDate, 'EEEE, MMMM dd, yyyy')}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status as keyof typeof statusColors]}`}>
          {status}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {workout.metadata?.duration && (
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{workout.metadata.duration}</p>
            <p className="text-xs text-gray-600">Minutes</p>
          </div>
        )}
        {workout.metadata?.total_sets && (
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{workout.metadata.total_sets}</p>
            <p className="text-xs text-gray-600">Sets</p>
          </div>
        )}
        {workout.metadata?.total_reps && (
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{workout.metadata.total_reps}</p>
            <p className="text-xs text-gray-600">Reps</p>
          </div>
        )}
      </div>

      {/* Exercises Summary */}
      {workout.metadata?.exercises_data && workout.metadata.exercises_data.length > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-600 mb-2">Exercises:</p>
          <div className="flex flex-wrap gap-2">
            {workout.metadata.exercises_data.slice(0, 3).map((ex, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                {ex.exercise_title}
              </span>
            ))}
            {workout.metadata.exercises_data.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                +{workout.metadata.exercises_data.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Notes */}
      {workout.metadata?.notes && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <p className="text-sm text-gray-600 line-clamp-2">{workout.metadata.notes}</p>
        </div>
      )}
    </div>
  )
}