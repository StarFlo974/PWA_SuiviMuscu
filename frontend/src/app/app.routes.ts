// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ExerciseListComponent } from './exercises/exercise-list.component';
import { ExerciseFormComponent } from './exercises/exercise-form.component';
import { StatisticComponent } from './components/statistic/statistic.component';

export const routes: Routes = [
  { path: 'listExercise', component: ExerciseListComponent },
  { path: 'createExercise', component: ExerciseFormComponent },
  { path: 'statistics', component: StatisticComponent },
];
