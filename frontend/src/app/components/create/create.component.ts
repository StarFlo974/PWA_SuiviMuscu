import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [],
  templateUrl: './create.component.html',
  styleUrl: './create.component.sass'
})
export class CreateComponent {

  constructor(
    public router: Router
  ) { }

  lastSession = {
    date: '24 mars 2025',
    exercises: ['Développer couché', 'Fentes chargée'],
  };

  lastCategory = 'Poids du corps';

  lastExercise = 'pompes diamant';

  goToCreateExercise() {
    this.router.navigate(['/createExercise']);
  }

  goToCreateSession() {
    this.router.navigate(['/createSession']);
  }
}
