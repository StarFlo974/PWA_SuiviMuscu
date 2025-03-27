import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    isDark = false;

    constructor() {
        const saved = localStorage.getItem('darkMode') === 'true';
        this.setDarkMode(saved);
    }

    toggleDarkMode() {
        this.setDarkMode(!this.isDark);
    }

    setDarkMode(value: boolean) {
        this.isDark = value;
        const html = document.documentElement;
        html.classList.toggle('dark', value);
        localStorage.setItem('darkMode', String(value));
    }

    getDarkMode(): boolean {
        return this.isDark;
    }
}

