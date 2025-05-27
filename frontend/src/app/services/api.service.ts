// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Exercise } from './models/exercise.model';
import { Session } from './models/session.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8000';
  private apiExerciseUrl = `${this.baseUrl}/api/exercises`;
  private apiSessionUrl = `${this.baseUrl}/api/sessions`;
  private apiCategorieUrl = `${this.baseUrl}/api/categories`;

  private jsonHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  ping(): Observable<{ message: string }> {
    return of({ message: 'Pong!' });
  }

  constructor(private http: HttpClient) { }

  //Exercice

  createExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(this.apiExerciseUrl, exercise, {
      headers: this.jsonHeaders,
    });
  }

  getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.apiExerciseUrl, {
      headers: this.jsonHeaders,
    });
  }

  updateExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.put<Exercise>(
      `${this.apiExerciseUrl}/${exercise.id}`,
      exercise,
      { headers: this.jsonHeaders }
    );
  }

  deleteExercise(id: number): Observable<any> {
    return this.http.delete(`${this.apiExerciseUrl}/${id}`, {
      headers: this.jsonHeaders,
    });
  }

  //Session

  createSession(session: Session): Observable<Session> {
    return this.http.post<Session>(this.apiSessionUrl, session, {
      headers: this.jsonHeaders,
    });
  }

  getSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(this.apiSessionUrl, {
      headers: this.jsonHeaders,
    });
  }

  updateSession(session: Session): Observable<Session> {
    return this.http.put<Session>(
      `${this.apiSessionUrl}/${session.id}`,
      session,
      { headers: this.jsonHeaders }
    );
  }

  deleteSession(id: number): Observable<any> {
    return this.http.delete(`${this.apiSessionUrl}/${id}`, {
      headers: this.jsonHeaders,
    });
  }

  // Categorie
  getCategorie(): Observable<any> {
    return this.http.get(`${this.apiCategorieUrl}`, {
      headers: this.jsonHeaders,
    });
  }

  createCategorie(categorie: any): Observable<any> {
    return this.http.post(`${this.apiCategorieUrl}`, categorie, {
      headers: this.jsonHeaders,
    });
  }

  updateCategorie(categorie: any): Observable<any> {
    return this.http.put(`${this.apiCategorieUrl}/${categorie.id}`, categorie, {
      headers: this.jsonHeaders,
    });
  }

  getExercisesByCategoryId(categoryId: number): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(
      `${this.apiExerciseUrl}?categoryId.id=${categoryId}`,
      { headers: this.jsonHeaders }
    );
  }

  updateExerciseCategory(
    exerciseId: number,
    categorieIri: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/merge-patch+json',
      Accept: 'application/json',
    });

    return this.http.patch(
      `${this.apiExerciseUrl}/${exerciseId}`,
      { categoryId: categorieIri },
      { headers }
    );
  }

  deleteCategorie(id: number): Observable<any> {
    return this.http.delete(`${this.apiCategorieUrl}/${id}`, {
      headers: this.jsonHeaders,
    });
  }
}
