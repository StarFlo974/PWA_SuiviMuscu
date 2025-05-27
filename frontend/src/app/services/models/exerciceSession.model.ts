import { Exercise } from "./exercise.model";
export interface ExerciseSession {
    id: number;
    exercise_id: Exercise;
}