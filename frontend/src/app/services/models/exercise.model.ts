// src/app/services/models/exercise.model.ts
export interface Exercise {
    id?: number;
    user_id: number;
    label: string;
    weight?: number;
    reps?: number;
    sets?: number;
    restTime?: number;
    distance?: number;
    category_id?: number;
  }