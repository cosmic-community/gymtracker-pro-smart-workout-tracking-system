import Link from 'next/link'
import { getWorkoutPlans } from '@/lib/cosmic'
import { WorkoutPlan } from '@/types'
import PlanCard from '@/components/PlanCard'

export const dynamic = 'force-dynamic'

export default async function PlansPage() {
  const plans = await getWorkoutPlans() as WorkoutPlan[]

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
              <h1 className="text-3xl font-bold text-gray-900">Workout Plans</h1>
              <p className="text-gray-600 mt-1">Choose a plan to reach your goals</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {plans.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🎯</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No workout plans yet</h3>
            <p className="text-gray-600">Create custom workout plans to achieve your fitness goals.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map(plan => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}