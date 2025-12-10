import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Fetch all exercises
export async function getExercises() {
  try {
    const response = await cosmic.objects
      .find({ type: 'exercises' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch exercises')
  }
}

// Fetch exercises by category
export async function getExercisesByCategory(category: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'exercises',
        'metadata.category': category
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch exercises by category')
  }
}

// Fetch single exercise
export async function getExercise(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'exercises',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch exercise')
  }
}

// Fetch workout sessions
export async function getWorkoutSessions() {
  try {
    const response = await cosmic.objects
      .find({ type: 'workout-sessions' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
    
    // Manual sorting by date (newest first)
    return response.objects.sort((a, b) => {
      const dateA = new Date(a.metadata?.date || a.created_at).getTime()
      const dateB = new Date(b.metadata?.date || b.created_at).getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch workout sessions')
  }
}

// Fetch single workout session
export async function getWorkoutSession(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'workout-sessions',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch workout session')
  }
}

// Create workout session
export async function createWorkoutSession(data: any) {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'workout-sessions',
      title: data.title,
      metadata: {
        date: data.date,
        duration: data.duration,
        exercises_data: data.exercises_data,
        total_sets: data.total_sets,
        total_reps: data.total_reps,
        notes: data.notes || '',
        status: data.status || 'Completed'
      }
    })
    
    return response.object
  } catch (error) {
    console.error('Error creating workout session:', error)
    throw new Error('Failed to create workout session')
  }
}

// Fetch workout plans
export async function getWorkoutPlans() {
  try {
    const response = await cosmic.objects
      .find({ type: 'workout-plans' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch workout plans')
  }
}