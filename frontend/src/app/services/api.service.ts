// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Exercise } from './models/exercise.model';
import { Session } from './models/session.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiExerciseUrl = '/api/exercises';
  private apiSessionUrl = '/api/sessions';
  private apiCategorieUrl = '/api/categories';

  private jsonHeaders = new HttpHeaders({
    'Accept': 'application/json'
  });

  ping(): Observable<{ message: string }> {
    return of({ message: 'Pong!' });
  }

  constructor(private http: HttpClient) { }

  //Exercice

  createExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(this.apiExerciseUrl, exercise, { headers: this.jsonHeaders });
  }

  getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.apiExerciseUrl, { headers: this.jsonHeaders });
  }

  updateExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.put<Exercise>(`${this.apiExerciseUrl}/${exercise.id}`, exercise, { headers: this.jsonHeaders });
  }

  deleteExercise(id: number): Observable<any> {
    return this.http.delete(`${this.apiExerciseUrl}/${id}`, { headers: this.jsonHeaders });
  }

  //Session

  createSession(session: Session): Observable<Session> {
    return this.http.post<Session>(this.apiSessionUrl, session, { headers: this.jsonHeaders });
  }

  getSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(this.apiSessionUrl, { headers: this.jsonHeaders });
  }

  updateSession(session: Session): Observable<Session> {
    return this.http.put<Session>(`${this.apiSessionUrl}/${session.id}`, session, { headers: this.jsonHeaders });
  }

  deleteSession(id: number): Observable<any> {
    return this.http.delete(`${this.apiSessionUrl}/${id}`, { headers: this.jsonHeaders });
  }



  getCategorie(): Observable<any> {
    return this.http.get(`${this.apiCategorieUrl}`, { headers: this.jsonHeaders });
  }

  createCategorie(categorie: any): Observable<any> {
    return this.http.post(`${this.apiCategorieUrl}`, categorie, { headers: this.jsonHeaders });
  }

  updateCategorie(categorie: any): Observable<any> {
    return this.http.put(`${this.apiCategorieUrl}/${categorie.id}`, categorie, { headers: this.jsonHeaders });
  }

  deleteCategorie(id: number): Observable<any> {
    return this.http.delete(`${this.apiCategorieUrl}/${id}`, { headers: this.jsonHeaders });
  }

}