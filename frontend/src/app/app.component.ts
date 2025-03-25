import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterModule],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  response: string = '';
  title = 'Title';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.ping().subscribe(
      (data) => { this.response = data.message; },
      (error) => { console.error('Erreur API:', error); }
    );
  }
}
