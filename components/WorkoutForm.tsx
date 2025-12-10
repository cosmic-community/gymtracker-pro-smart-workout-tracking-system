'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ExerciseData {
  exercise_title: string
  sets: Array<{
    set_number: number
    reps: number
    weight: number
  }>
}

export default function WorkoutForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [exercises, setExercises] = useState<ExerciseData[]>([
    {
      exercise_title: '',
      sets: [{ set_number: 1, reps: 0, weight: 0 }]
    }
  ])
  const [duration, setDuration] = useState(60)
  const [notes, setNotes] = useState('')

  const addExercise = () => {
    setExercises([
      ...exercises,
      {
        exercise_title: '',
        sets: [{ set_number: 1, reps: 0, weight: 0 }]
      }
    ])
  }

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index))
  }

  const addSet = (exerciseIndex: number) => {
    const newExercises = [...exercises]
    const exercise = newExercises[exerciseIndex]
    if (exercise) {
      exercise.sets.push({
        set_number: exercise.sets.length + 1,
        reps: 0,
        weight: 0
      })
      setExercises(newExercises)
    }
  }

  const updateExercise = (index: number, field: string, value: string) => {
    const newExercises = [...exercises]
    const exercise = newExercises[index]
    if (exercise) {
      ;(exercise as any)[field] = value
      setExercises(newExercises)
    }
  }

  const updateSet = (exerciseIndex: number, setIndex: number, field: string, value: number) => {
    const newExercises = [...exercises]
    const exercise = newExercises[exerciseIndex]
    if (exercise && exercise.sets[setIndex]) {
      ;(exercise.sets[setIndex] as any)[field] = value
      setExercises(newExercises)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Calculate totals
      const totalSets = exercises.reduce((sum, ex) => sum + ex.sets.length, 0)
      const totalReps = exercises.reduce(
        (sum, ex) => sum + ex.sets.reduce((s, set) => s + set.reps, 0),
        0
      )

      const workoutData = {
        title: `Workout - ${new Date().toLocaleDateString()}`,
        date: new Date().toISOString(),
        duration,
        exercises_data: exercises,
        total_sets: totalSets,
        total_reps: totalReps,
        notes,
        status: 'Completed'
      }

      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workoutData)
      })

      if (!response.ok) {
        throw new Error('Failed to create workout')
      }

      router.push('/workouts')
      router.refresh()
    } catch (error) {
      console.error('Error creating workout:', error)
      alert('Failed to save workout. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Duration */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Duration (minutes)
        </label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          min="1"
          required
        />
      </div>

      {/* Exercises */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Exercises</h3>
          <button
            type="button"
            onClick={addExercise}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            + Add Exercise
          </button>
        </div>

        <div className="space-y-6">
          {exercises.map((exercise, exerciseIndex) => (
            <div key={exerciseIndex} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start gap-4 mb-4">
                <input
                  type="text"
                  value={exercise.exercise_title}
                  onChange={(e) => updateExercise(exerciseIndex, 'exercise_title', e.target.value)}
                  placeholder="Exercise name"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                {exercises.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExercise(exerciseIndex)}
                    className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Sets */}
              <div className="space-y-2">
                {exercise.sets.map((set, setIndex) => (
                  <div key={setIndex} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-12">Set {set.set_number}</span>
                    <input
                      type="number"
                      value={set.reps}
                      onChange={(e) => updateSet(exerciseIndex, setIndex, 'reps', parseInt(e.target.value) || 0)}
                      placeholder="Reps"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      min="0"
                      required
                    />
                    <input
                      type="number"
                      value={set.weight}
                      onChange={(e) => updateSet(exerciseIndex, setIndex, 'weight', parseInt(e.target.value) || 0)}
                      placeholder="Weight (kg)"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      min="0"
                      required
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => addSet(exerciseIndex)}
                className="mt-3 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm"
              >
                + Add Set
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notes (optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="How did you feel? Any observations?"
        />
      </div>

      {/* Submit */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : 'Save Workout'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}