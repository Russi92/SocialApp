import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSonnerToaster } from 'ngx-sonner';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { MyTranslate } from './core/services/my-translate';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSonnerToaster, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('social-app');

  private translate = inject(TranslateService);
  private myTranslate = inject(MyTranslate);

  constructor() {
    this.translate.addLangs(['ar', 'en']);

    if (localStorage.getItem('lang')) {
      this.translate.use(localStorage.getItem('lang')!);
      this.myTranslate.changeDirection();
    }
  }
}
