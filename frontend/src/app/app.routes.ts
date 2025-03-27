// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ExerciseFormComponent } from './exercices/exercise-form.component';
import { StatisticComponent } from './components/statistic/statistic.component';

export const routes: Routes = [
  {
    path: 'exercises',
    component: ExerciseFormComponent
  },
  {
    path: 'statistics',
    component: StatisticComponent
  },
  // { path: '', component: HomeComponent },
  // { path: 'exercises', component: ExerciseListComponent },
  // { path: 'exercises/add', component: ExerciseFormComponent },
  // { path: 'exercises/history', component: ExerciseHistoryComponent },
  // { path: 'profile', component: ProfileComponent },
];