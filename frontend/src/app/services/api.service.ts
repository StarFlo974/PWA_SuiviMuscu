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

  ping(): Observable<{ message: string }> {
    return of({ message: 'Pong!' });
  }

  constructor(private http: HttpClient) {}

  createExercise(exercise: Exercise): Observable<Exercise> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    return this.http.post<Exercise>(
      'https://localhost:8000/api/exercises',
      JSON.stringify(exercise), // <- important : stringify
      { headers }
    );
  }
  
  

  getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.apiUrl);
  }

  updateExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.put<Exercise>(`${this.apiUrl}/${exercise.id}`, exercise);
  }

  deleteExercise(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}