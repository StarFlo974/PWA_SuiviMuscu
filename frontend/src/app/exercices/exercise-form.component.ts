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
  templateUrl: './exercise-form.component.html',
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
      category_id: [''],
      weight: [null],
      reps: [null],
      sets: [null],
      rest: [null],
      duration: [null],
      user_id: ['/api/users/1']
    });    
  }

  ngOnInit() {
    this.loadExercises();
  }

  onSubmit() {
    if (this.exerciseForm.valid) {
      console.log(this.exerciseForm.value);
      this.apiService.createExercise(this.exerciseForm.value).subscribe({
          next: () => {
            this.loadExercises();
            this.exerciseForm.reset();
          },
          error: (err) => console.error('Erreur', err)
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