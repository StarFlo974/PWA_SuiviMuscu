// Créez un nouveau fichier : src/app/exercises/exercise-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../auth/auth.service';
import { Session } from '../../services/models/session.model';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

interface UserProfile {
  id: number;
  email: string;
  roles: string[];
}

interface Exercice {
  id?: number;
  label: string;
}

@Component({
  selector: 'app-session-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgSelectModule],
  templateUrl: './session-form.component.html'
})
export class SessionFormComponent implements OnInit {
  sessionForm: FormGroup;
  sessions: Session[] = [];
  exercices: Exercice[] = [];
  selectedOptions = [];


  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.sessionForm = this.fb.group({
      name: ['', Validators.required],
      day: [null, Validators.required],
      user_id: [null],
      selectedExerciseIds: [[], Validators.required]
    });
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  ngOnInit() {
    this.authService.getProfile().subscribe({
      next: (profile: UserProfile) => {
        const iri = `/api/users/${profile.id}`;
        this.sessionForm.patchValue({ user_id: iri });
      },
      error: (err) => console.error('Erreur de récupération du profil', err)
    });
    this.loadSessions();
    this.loadExercises();
  }

  onSubmit() {
    if (this.sessionForm.valid) {
      const formValue = this.sessionForm.value;

      const exerciseSessions = formValue.selectedExerciseIds.map((id: number) => ({
        exercise_id: `/api/exercises/${id}`
      }));

      const payload = {
        name: formValue.name,
        day: formValue.day,
        user_id: formValue.user_id,
        exerciseSessions
      };

      this.apiService.createSession(payload).subscribe({
        next: () => {
          this.loadSessions();
          this.sessionForm.reset();
          this.toastr.success('Séance créé avec succès !');
        },
        error: (err) => {
          console.error('Erreur', err);
          this.toastr.error('Échec de la création de la séance.');
        }
      });
    }
  }

  loadSessions() {
    this.apiService.getSessions().subscribe(res => {
      this.sessions = res;
    });
  }

  loadExercises() {
    this.apiService.getExercises().subscribe({
      next: (res) => {
        this.exercices = res;
        console.log(res);

      },
      error: (err) => console.error('Erreur de récupération des exercices', err)
    });
  }


  deleteSession(id: number) {
    this.apiService.deleteSession(id)
      .subscribe({
        next: () => this.loadSessions(),
        error: (err) => console.error('Erreur', err)
      });
  }
}

