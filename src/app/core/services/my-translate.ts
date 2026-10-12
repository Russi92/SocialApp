import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MyTranslate {
  private readonly translateService = inject(TranslateService);

  changeDirection(): void {
    if (localStorage.getItem('lang') === 'en') {
      //dir ltr
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    } else if (localStorage.getItem('lang') === 'ar') {
      //dir rtl
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    }
  }

  changeLage(lang: string): void {
    localStorage.setItem('lang', lang);
    this.translateService.use(lang);
    this.changeDirection();
  }
}
