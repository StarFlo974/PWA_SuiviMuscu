import { ExerciseSession } from "./ExerciceSession.model";
export interface Session {
  id?: number;
  user_id: number;
  name: string;
  day?: Date;
  exerciseSessions: ExerciseSession[];
}