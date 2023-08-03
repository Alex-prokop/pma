import { Component } from '@angular/core';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'project-management-system';
  constructor(private languageService: LanguageService) {}
  switchLanguage(language: string) {
    this.languageService.switchLanguage(language);
  }
}
