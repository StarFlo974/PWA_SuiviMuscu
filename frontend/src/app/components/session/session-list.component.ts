import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Ajouté ici
import { ApiService } from '../../services/api.service';
import { Session } from '../../services/models/session.model';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-session-list', // Correction du selector
  standalone: true,
  imports: [CommonModule, RouterModule], // Ajouté ici
  templateUrl: './session-list.component.html',
})
export class SessionListComponent implements OnInit {
  sessions: Session[] = [];

  constructor(private apiService: ApiService, private router: Router) { }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  ngOnInit() {
    this.loadSessions();
  }

  loadSessions() {
    this.apiService.getSessions().subscribe(res => {
      this.sessions = res;
    });
  }

  deleteSession(id: number) {
    this.apiService.deleteSession(id).subscribe({
      next: () => this.loadSessions(),
      error: (err) => console.error('Erreur', err)
    });
  }
}
