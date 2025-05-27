// Créez un nouveau fichier : src/app/exercises/exercise-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../auth/auth.service';
import { Exercise } from '../../services/models/exercise.model';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

interface UserProfile {
  id: number;
  email: string;
  roles: string[];
}

@Component({
  selector: 'app-exercise-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './exercise-form.component.html',
})
export class ExerciseFormComponent implements OnInit {
  exerciseForm: FormGroup;
  exercises: Exercise[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.exerciseForm = this.fb.group({
      label: ['', Validators.required],
      category_id: [null],
      weight: [null],
      reps: [null],
      sets: [null],
      rest: [null],
      duration: [null],
      user_id: [null]
    });
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  ngOnInit() {
    this.authService.getProfile().subscribe({
      next: (profile: UserProfile) => {
        const iri = `/api/users/${profile.id}`;
        this.exerciseForm.patchValue({ user_id: iri });
      },
      error: (err) => console.error('Erreur de récupération du profil', err)
    });
    this.loadExercises();
  }


  onSubmit() {
    if (this.exerciseForm.valid) {
      this.apiService.createExercise(this.exerciseForm.value).subscribe({
        next: () => {
          this.exerciseForm.reset();
          this.toastr.success('Exercice créé avec succès !');
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Échec de la création de l\'exercice.');
        }
      });
    }
  }

  loadExercises() {
    this.apiService.getExercises().subscribe(res => {
      this.exercises = res;
    });
  }


  deleteExercise(id: number) {
    this.apiService.deleteExercise(id)
      .subscribe({
        next: () => this.loadExercises(),
        error: (err) => console.error('Erreur', err)
      });
  }
}

