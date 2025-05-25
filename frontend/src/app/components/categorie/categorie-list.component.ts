import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Ajouté ici
import { ApiService } from '../../services/api.service';
import { Categorie } from '../../services/models/categorie.model';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-categorie-list', // Correction du selector
  standalone: true,
  imports: [CommonModule, RouterModule], // Ajouté ici
  templateUrl: './categorie-list.component.html',
})
export class CategorieListComponent implements OnInit {
  categories: Categorie[] = [];

  constructor(private apiService: ApiService, private router: Router) { }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  ngOnInit() {
    this.loadCategorie();
  }

  loadCategorie() {
    this.apiService.getCategorie().subscribe(res => {
      this.categories = res;
    });
  }

  deleteCategorie(id: number) {
    this.apiService.deleteCategorie(id).subscribe({
      next: () => this.loadCategorie(),
      error: (err) => console.error('Erreur', err)
    });
  }
}
