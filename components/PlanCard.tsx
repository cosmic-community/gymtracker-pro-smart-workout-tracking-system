import { WorkoutPlan } from '@/types'

interface PlanCardProps {
  plan: WorkoutPlan
}

export default function PlanCard({ plan }: PlanCardProps) {
  const goal = plan.metadata?.goal || 'General Fitness'
  const duration = plan.metadata?.duration_weeks || 0
  const exercises = plan.metadata?.exercises || []

  const goalColors = {
    'Muscle Gain': 'bg-blue-100 text-blue-700',
    'Weight Loss': 'bg-green-100 text-green-700',
    'Strength': 'bg-purple-100 text-purple-700',
    'Endurance': 'bg-orange-100 text-orange-700'
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.title}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${goalColors[goal as keyof typeof goalColors] || 'bg-gray-100 text-gray-700'}`}>
            {goal}
          </span>
        </div>
      </div>

      {plan.metadata?.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {plan.metadata.description}
        </p>
      )}

      <div className="space-y-3">
        {duration > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>📅</span>
            <span>{duration} weeks program</span>
          </div>
        )}
        
        {exercises.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>🏋️</span>
            <span>{exercises.length} exercises</span>
          </div>
        )}
      </div>

      <button className="w-full mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium">
        Start Plan
      </button>
    </div>
  )
}