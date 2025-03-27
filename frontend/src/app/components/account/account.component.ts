import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account',
  imports: [FormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.sass'
})
export class AccountComponent {

  private isDark = false;

  nom = '';
  prenom = '';
  email = '';

  constructor(public themeService: ThemeService) { }

  get isDarkMode(): boolean {
    return this.themeService.getDarkMode();
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Traite le fichier ici (ex: upload, preview, etc.)
      console.log('Fichier sélectionné :', file.name);
    }
  }
}
