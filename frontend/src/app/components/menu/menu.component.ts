import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent {
  constructor(private router: Router) { }
  activeTab: string = 'exercises';

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.router.navigate([`/${tab}`]);
  }
}
