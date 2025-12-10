// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
}

// Exercise categories
export type ExerciseCategory = 'Strength' | 'Cardio' | 'Flexibility'
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced'
export type WorkoutGoal = 'Muscle Gain' | 'Weight Loss' | 'Strength' | 'Endurance'
export type WorkoutStatus = 'Completed' | 'In Progress' | 'Planned'

// Exercise interface
export interface Exercise extends CosmicObject {
  type: 'exercises'
  metadata: {
    category?: ExerciseCategory
    muscle_groups?: string[]
    instructions?: string
    image?: {
      url: string
      imgix_url: string
    }
    difficulty?: DifficultyLevel
    video_url?: string
  }
}

// Exercise set for tracking
export interface ExerciseSet {
  set_number: number
  reps: number
  weight: number
  notes?: string
}

// Workout session interface
export interface WorkoutSession extends CosmicObject {
  type: 'workout-sessions'
  metadata: {
    date?: string
    duration?: number
    exercises_data?: Array<{
      exercise_id: string
      exercise_title: string
      sets: ExerciseSet[]
    }>
    total_sets?: number
    total_reps?: number
    notes?: string
    status?: WorkoutStatus
  }
}

// Workout plan interface
export interface WorkoutPlan extends CosmicObject {
  type: 'workout-plans'
  metadata: {
    goal?: WorkoutGoal
    duration_weeks?: number
    exercises?: Exercise[]
    schedule?: string
    description?: string
  }
}

// Personal record interface
export interface PersonalRecord {
  exercise_id: string
  exercise_title: string
  max_weight: number
  date: string
}

// Dashboard statistics
export interface DashboardStats {
  total_workouts: number
  total_exercises: number
  this_week_workouts: number
  personal_records: number
  recent_workouts: WorkoutSession[]
}

// API response types
export interface CosmicResponse<T> {
  objects: T[]
  total: number
}

// Type guards
export function isExercise(obj: CosmicObject): obj is Exercise {
  return obj.type === 'exercises'
}

export function isWorkoutSession(obj: CosmicObject): obj is WorkoutSession {
  return obj.type === 'workout-sessions'
}

export function isWorkoutPlan(obj: CosmicObject): obj is WorkoutPlan {
  return obj.type === 'workout-plans'
}