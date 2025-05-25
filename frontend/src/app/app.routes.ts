import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ExerciseListComponent } from './components/exercise/exercise-list.component';
import { ExerciseFormComponent } from './components/exercise/exercise-form.component';
import { SessionListComponent } from './components/session/session-list.component';
import { SessionFormComponent } from './components/session/session-form.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { QuoteComponent } from './components/quote/quote.component';
import { TrainingComponent } from './components/training/training.component';
import { AccountComponent } from './components/account/account.component';
import { CreateComponent } from './components/create/create.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


export const routes: Routes = [
  // Redirection par défaut
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Routes publiques
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Routes protégées
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'listExercise', component: ExerciseListComponent },
      { path: 'createExercise', component: ExerciseFormComponent },
      { path: 'listSession', component: SessionListComponent },
      { path: 'createSession', component: SessionFormComponent },
      { path: 'statistic', component: StatisticComponent },
      { path: 'quote', component: QuoteComponent },
      { path: 'training', component: TrainingComponent },
      { path: 'account', component: AccountComponent },
      { path: 'create', component: CreateComponent },
    ]
  },

  // Catch-all, redirige vers login si aucune route ne matche
  { path: '**', redirectTo: 'login' },
];
