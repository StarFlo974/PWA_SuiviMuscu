import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Ajouté ici
import { ApiService } from '../../services/api.service';
import { Categorie } from '../../services/models/categorie.model';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categorie-list', // Correction du selector
  standalone: true,
  imports: [CommonModule, RouterModule], // Ajouté ici
  templateUrl: './categorie-list.component.html',
})
export class CategorieListComponent implements OnInit {
  categories: Categorie[] = [];

  constructor(private apiService: ApiService, private router: Router, private toastr: ToastrService) { }

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
      next: () => {
        this.loadCategorie();
        this.toastr.success('Catégorie supprimée avec succès !');
      },
       error: (err) => {
        console.error('Erreur', err);
        this.toastr.error('Échec de la suppression de la catégorie.');
      }
    });
  }
}
