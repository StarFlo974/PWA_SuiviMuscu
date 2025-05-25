import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.sass',
})
export class RegisterComponent {
  email = '';
  password = '';
  message = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  this.http
    .post('http://localhost:8000/api/register', {
      email: this.email,
      password: this.password,
    }, { headers })
    .subscribe({
      next: (response) => {
        console.log('Succès:', response);
        this.message = 'Inscription réussie, connectez-vous !';
      },
      error: (err) => {
        console.log('Erreur complète:', err);
        console.log('Status:', err.status);
        console.log('Message:', err.message);
        this.message = err.error?.error || 'Erreur lors de l\'inscription';
      },
    });
}
}
