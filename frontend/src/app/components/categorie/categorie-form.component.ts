import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../auth/auth.service';
import { Categorie } from '../../services/models/categorie.model';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

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
  selector: 'app-categorie-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgSelectModule,
  ],
  templateUrl: './categorie-form.component.html',
})
export class CategorieFormComponent implements OnInit {
  categorieForm: FormGroup;
  categories: Categorie[] = [];
  exercices: Exercice[] = [];
  selectedOptions = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService
  ) {
    this.categorieForm = this.fb.group({
      name: ['', Validators.required],
      selectedExerciseIds: [[], Validators.required],
      user_id: [null],
    });
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  ngOnInit() {
    this.authService.getProfile().subscribe({
      next: (profile: UserProfile) => {
        const iri = `/api/users/${profile.id}`;
        this.categorieForm.patchValue({ user_id: iri });
      },
      error: (err) => console.error('Erreur de récupération du profil', err),
    });
    this.loadCategorie();
    this.loadExercises();
  }

  onSubmit() {
    if (this.categorieForm.valid) {
      const formValue = this.categorieForm.value;

      const payload = {
        name: formValue.name,
        user_id: formValue.user_id,
      };

      this.apiService.createCategorie(payload).subscribe({
        next: (newCategorie: Categorie) => {
          const categorieIri = `/api/categories/${newCategorie.id}`;

          const updates = formValue.selectedExerciseIds.map(
            (exerciseId: number) =>
              this.apiService.updateExerciseCategory(exerciseId, categorieIri)
          );

          forkJoin(updates).subscribe({
            next: () => {
              this.loadCategorie();
              this.categorieForm.reset();
            },
            error: (err) => {
              console.error('Erreur de mise à jour des exercices', err);
            },
          });
        },
        error: (err) => console.error('Erreur création catégorie', err),
      });
    }
  }

  loadCategorie() {
    this.apiService.getCategorie().subscribe((res) => {
      this.categories = res;
    });
  }

  loadExercises() {
    this.apiService.getExercises().subscribe({
      next: (res) => {
        this.exercices = res;
        console.log(res);
      },
      error: (err) =>
        console.error('Erreur de récupération des exercices', err),
    });
  }

  deleteCategorie(id: number) {
    this.apiService.deleteCategorie(id).subscribe({
      next: () => this.loadCategorie(),
      error: (err) => console.error('Erreur', err),
    });
  }
}
