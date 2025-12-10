import { Exercise } from '@/types'

interface ExerciseCardProps {
  exercise: Exercise
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  const image = exercise.metadata?.image
  const category = exercise.metadata?.category || 'General'
  const difficulty = exercise.metadata?.difficulty || 'Intermediate'
  const muscleGroups = exercise.metadata?.muscle_groups || []

  const categoryColors = {
    Strength: 'bg-blue-100 text-blue-700',
    Cardio: 'bg-green-100 text-green-700',
    Flexibility: 'bg-purple-100 text-purple-700'
  }

  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-yellow-100 text-yellow-700',
    Advanced: 'bg-red-100 text-red-700'
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      {image && (
        <div className="aspect-video w-full bg-gray-100">
          <img
            src={`${image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
            alt={exercise.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900">{exercise.title}</h3>
        </div>
        
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-700'}`}>
            {category}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[difficulty as keyof typeof difficultyColors]}`}>
            {difficulty}
          </span>
        </div>
        
        {/* Muscle Groups */}
        {muscleGroups.length > 0 && (
          <div className="mb-3">
            <p className="text-sm text-gray-600 mb-1">Target Muscles:</p>
            <div className="flex flex-wrap gap-1">
              {muscleGroups.map((muscle, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {muscle}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Instructions Preview */}
        {exercise.metadata?.instructions && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {exercise.metadata.instructions}
          </p>
        )}
      </div>
    </div>
  )
}