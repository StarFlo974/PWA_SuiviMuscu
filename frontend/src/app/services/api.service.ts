// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Exercise } from './models/exercise.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = '/api/exercises';

  private jsonHeaders = new HttpHeaders({
    'Accept': 'application/json'
  });

  ping(): Observable<{ message: string }> {
    return of({ message: 'Pong!' });
  }

  constructor(private http: HttpClient) { }

  createExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(this.apiUrl, exercise, { headers: this.jsonHeaders });
  }

  getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.apiUrl, { headers: this.jsonHeaders });
  }

  updateExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.put<Exercise>(`${this.apiUrl}/${exercise.id}`, exercise, { headers: this.jsonHeaders });
  }

  deleteExercise(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.jsonHeaders });
  }
}