import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    this.http.post<{ token: string }>('http://localhost:8000/api/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/training']);
      },
      error: () => this.error = 'Email ou mot de passe incorrect'
    });
  }
}
