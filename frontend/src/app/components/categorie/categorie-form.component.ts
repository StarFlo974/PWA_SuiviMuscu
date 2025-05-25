import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../auth/auth.service';
import { Categorie } from '../../services/models/categorie.model';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

interface UserProfile {
  id: number;
  email: string;
  roles: string[];
}

@Component({
  selector: 'app-categorie-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './categorie-form.component.html',
})
export class CategorieFormComponent implements OnInit {
  categorieForm: FormGroup;
  categories: Categorie[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService
  ) {
    this.categorieForm = this.fb.group({
      name: ['', Validators.required],
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
        this.categorieForm.patchValue({ user_id: iri });
      },
      error: (err) => console.error('Erreur de récupération du profil', err)
    });
    this.loadCategorie();
  }

  onSubmit() {
    if (this.categorieForm.valid) {
      this.apiService.createCategorie(this.categorieForm.value).subscribe({
        next: () => {
          this.loadCategorie();
          this.categorieForm.reset();
        },
        error: (err) => console.error('Erreur', err)
      });
    }
  }

  loadCategorie() {
    this.apiService.getCategorie().subscribe(res => {
      this.categories = res;
    });
  }


  deleteCategorie(id: number) {
    this.apiService.deleteCategorie(id)
      .subscribe({
        next: () => this.loadCategorie(),
        error: (err) => console.error('Erreur', err)
      });
  }
}

