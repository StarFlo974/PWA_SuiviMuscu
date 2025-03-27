// Créez un nouveau fichier : src/app/exercises/exercise-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Exercise } from '../services/models/exercise.model';

@Component({
  selector: 'app-exercise-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="exerciseForm" (ngSubmit)="onSubmit()">
      <input 
        formControlName="label" 
        placeholder="Nom de l'exercice"
      >
      <input 
        type="number" 
        formControlName="weight" 
        placeholder="Poids"
      >
      <input 
        type="number" 
        formControlName="reps" 
        placeholder="Répétitions"
      >
      <button type="submit">Créer Exercice</button>
    </form>

    <div>
      <h2>Exercices existants :</h2>
      <ul>
        <li *ngFor="let exercise of exercises">
          {{ exercise.label }} - 
          Poids: {{ exercise.weight }} - 
          Répétitions: {{ exercise.reps }}
          <button (click)="deleteExercise(exercise.id)">Supprimer</button>
        </li>
      </ul>
    </div>
  `
})
export class ExerciseFormComponent implements OnInit {
  exerciseForm: FormGroup;
  exercises: Exercise[] = [];

  constructor(
    private fb: FormBuilder, 
    private apiService: ApiService
  ) {
    this.exerciseForm = this.fb.group({
      label: ['', Validators.required],
      weight: [null],
      reps: [null],
      sets: [null],
      user_id: ['api/users/1'],
      category_id: [null]
    });
  }

  ngOnInit() {
    this.loadExercises();
  }

  onSubmit() {
    if (this.exerciseForm.valid) {
      console.log(this.exerciseForm.value);
      this.apiService.createExercise(this.exerciseForm.value)
        .subscribe({
          next: () => {
            this.loadExercises();
            this.exerciseForm.reset();
          },
          error: (err) => console.error('Erreur', err)
        });
    }
  }

  loadExercises() {
    this.apiService.getExercises()
      .subscribe(exercises => this.exercises = exercises);
  }

  deleteExercise(id: number) {
    this.apiService.deleteExercise(id)
      .subscribe({
        next: () => this.loadExercises(),
        error: (err) => console.error('Erreur', err)
      });
  }
}