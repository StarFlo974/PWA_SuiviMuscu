import { Component, OnInit } from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { ApiService } from './services/api.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterModule, MenuComponent, HeaderComponent, CommonModule],
  styleUrls: ['../styles.sass'],
  standalone: true
})
export class AppComponent implements OnInit {
  response: string = '';
  title = 'Title';

  constructor(
    private apiService: ApiService,
    public router: Router
  ) { }

  ngOnInit() {
    this.apiService.ping().subscribe({
      next: (data) => this.response = data.message,
      error: (err) => console.error('Erreur API:', err)
    });
  }

  shouldShowMenu(): boolean {
    const hiddenRoutes = ['/login', '/register'];
    return !hiddenRoutes.includes(this.router.url);
  }
}
