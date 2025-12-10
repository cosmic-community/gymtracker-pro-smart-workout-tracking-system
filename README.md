# 💪 GymTracker Pro - Smart Workout Tracking System

![App Preview](https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=300&fit=crop&auto=format)

Aplikasi pelacakan workout gym yang komprehensif dengan fitur-fitur canggih untuk membantu Anda mencapai target fitness. Dibangun dengan Next.js 16 dan terintegrasi dengan Cosmic CMS untuk manajemen data yang fleksibel.

## ✨ Features

- 📊 **Interactive Dashboard** - Visualisasi progress workout dengan chart dan statistik
- 🏋️ **Exercise Library** - Database lengkap latihan dengan kategori dan instruksi
- 📝 **Workout Logger** - Pencatatan workout dengan detail set, reps, dan weight
- 📈 **Progress Tracking** - Grafik perkembangan dan personal records
- 🎯 **Workout Plans** - Template workout yang dapat disesuaikan
- 💪 **Personal Records** - Tracking PR untuk setiap latihan
- 📱 **Responsive Design** - Optimal di desktop dan mobile
- 🌙 **Modern UI** - Interface yang clean dan mudah digunakan

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6939202929f51b74cc1d24fb&clone_repository=6939282d29f51b74cc1d2537)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from custom workout tracking structure

### Code Generation Prompt

> buatkan aplikasi tracker workout gym

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic
- **Runtime**: Bun
- **Charts**: Recharts for data visualization

## 🚀 Getting Started

### Prerequisites

- Bun installed on your machine
- A Cosmic account and bucket
- Node.js 18+ (for compatibility)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd gymtracker-pro
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. **Run the development server**
   ```bash
   bun run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Cosmic SDK Examples

### Fetching Exercises

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all exercises
const { objects: exercises } = await cosmic.objects
  .find({ type: 'exercises' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get exercise by category
const { objects: strengthExercises } = await cosmic.objects
  .find({ 
    type: 'exercises',
    'metadata.category': 'Strength'
  })
  .props(['id', 'title', 'metadata'])
```

### Creating a Workout Session

```typescript
const newWorkout = await cosmic.objects.insertOne({
  title: `Workout - ${new Date().toLocaleDateString()}`,
  type: 'workout-sessions',
  metadata: {
    date: new Date().toISOString(),
    duration: 60,
    exercises_completed: ['exercise-id-1', 'exercise-id-2'],
    total_sets: 15,
    total_reps: 120,
    notes: 'Great workout session!'
  }
})
```

### Tracking Progress

```typescript
// Get workout history
const { objects: workouts } = await cosmic.objects
  .find({ type: 'workout-sessions' })
  .props(['id', 'title', 'metadata'])
  .depth(1)

// Sort by date (manual sorting for SDK v1.5+)
const sortedWorkouts = workouts.sort((a, b) => {
  const dateA = new Date(a.metadata?.date || '').getTime()
  const dateB = new Date(b.metadata?.date || '').getTime()
  return dateB - dateA // Newest first
})
```

## 🎨 Cosmic CMS Integration

This app uses Cosmic CMS with the following Object Types:

### Exercises
- **Title**: Exercise name
- **Category**: Strength/Cardio/Flexibility
- **Muscle Groups**: Target muscle groups
- **Instructions**: Exercise instructions
- **Image**: Exercise demonstration image
- **Difficulty**: Beginner/Intermediate/Advanced

### Workout Sessions
- **Date**: Workout date
- **Duration**: Session duration (minutes)
- **Exercises**: List of exercises performed
- **Sets/Reps/Weight**: Detailed tracking per exercise
- **Notes**: Session notes
- **Status**: Completed/In Progress

### Workout Plans
- **Title**: Plan name
- **Goal**: Muscle Gain/Weight Loss/Strength/Endurance
- **Duration**: Plan duration (weeks)
- **Exercises**: List of exercises in plan
- **Schedule**: Weekly schedule

## 🚀 Deployment Options

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Deploy to Netlify

1. Push your code to GitHub
2. Import your repository in Netlify
3. Add environment variables in Netlify dashboard
4. Set build command: `bun run build`
5. Set publish directory: `.next`
6. Deploy!

### Environment Variables for Production

Make sure to set these environment variables in your hosting platform:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## 📖 Usage Guide

### Starting a Workout

1. Navigate to the dashboard
2. Click "Start Workout"
3. Select exercises from the library
4. Log sets, reps, and weight for each exercise
5. Complete and save your workout

### Viewing Progress

1. Go to the "Progress" tab
2. View charts showing your workout history
3. Check personal records for each exercise
4. Analyze trends over time

### Creating Workout Plans

1. Navigate to "Workout Plans"
2. Click "Create New Plan"
3. Add exercises and set schedule
4. Save and start following your plan

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

For support, please visit the [Cosmic Documentation](https://www.cosmicjs.com/docs) or open an issue in this repository.

---

Built with ❤️ using [Cosmic](https://www.cosmicjs.com) and Next.js

<!-- README_END -->