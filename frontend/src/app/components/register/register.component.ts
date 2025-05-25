import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.sass'
})
export class RegisterComponent {
  email = '';
  password = '';
  message = '';

  constructor(private http: HttpClient) { }

  onSubmit() {
    this.http.post('http://localhost:8000/api/register', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => this.message = 'Inscription réussie, connectez-vous !',
      error: err => this.message = err.error?.error || 'Erreur lors de l’inscription'
    });
  }
}
