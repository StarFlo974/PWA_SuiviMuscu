import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = 'http://localhost:8000/api'; // adapte selon ton URL backend
    redirectUrl: string | null = null;

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    login(email: string, password: string) {
        return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password });
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    saveToken(token: string) {
        localStorage.setItem('token', token);
    }

    // Pour appeler /api/profil si besoin
    getProfile() {
        return this.http.get(`${this.apiUrl}/profil`);
    }
}
