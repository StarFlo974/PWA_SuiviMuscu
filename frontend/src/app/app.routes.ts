// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ExerciseFormComponent } from './exercices/exercise-form.component';

export const routes: Routes = [
  { 
    path: 'exercises', 
    component: ExerciseFormComponent 
  },
  // Autres routes si nécessaire
  { 
    path: '', 
    redirectTo: '/exercises', 
    pathMatch: 'full' 
  }
];