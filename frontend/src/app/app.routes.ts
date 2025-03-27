// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ExerciseListComponent } from './components/exercise/exercise-list.component';
import { ExerciseFormComponent } from './components/exercise/exercise-form.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { QuoteComponent } from './components/quote/quote.component';
import { TrainingComponent } from './components/training/training.component';
import { AccountComponent } from './components/account/account.component';

export const routes: Routes = [
  { path: 'listExercise', component: ExerciseListComponent },
  { path: 'createExercise', component: ExerciseFormComponent },
  { path: 'statistic', component: StatisticComponent },
  { path: 'quote', component: QuoteComponent },
  { path: 'training', component: TrainingComponent },
  { path: 'account', component: AccountComponent },
];
