import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Ajouté ici
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Exercise } from '../../services/models/exercise.model';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-exercise-list', // Correction du selector
  standalone: true,
  imports: [CommonModule, RouterModule], // Ajouté ici
  templateUrl: './exercise-list.component.html',
})
export class ExerciseListComponent implements OnInit {
  exercises: Exercise[] = [];

  constructor(private apiService: ApiService, private router: Router, private toastr: ToastrService) { }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  ngOnInit() {
    this.loadExercises();
  }

  loadExercises() {
    this.apiService.getExercises().subscribe(res => {
      this.exercises = res;
    });
  }

  deleteExercise(id: number) {
    this.apiService.deleteExercise(id).subscribe({
      next: () => {
        this.loadExercises(),
          this.toastr.success('Exercice supprimer avec succès !');
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Échec de la suppression de l\'exercice.');
      }
    });
  }
}
