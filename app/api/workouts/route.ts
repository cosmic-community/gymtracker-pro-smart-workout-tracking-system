import { NextResponse } from 'next/server'
import { createWorkoutSession } from '@/lib/cosmic'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const workout = await createWorkoutSession(data)
    
    return NextResponse.json({ success: true, workout })
  } catch (error) {
    console.error('Error creating workout:', error)
    return NextResponse.json(
      { error: 'Failed to create workout' },
      { status: 500 }
    )
  }
}