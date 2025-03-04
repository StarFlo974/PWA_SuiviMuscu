import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  response: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.ping().subscribe(
      (data) => { this.response = data.message; },
      (error) => { console.error('Erreur API:', error); }
    );
  }
}
