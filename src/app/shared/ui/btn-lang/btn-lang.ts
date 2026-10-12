import { Component, inject } from '@angular/core';
import { MyTranslate } from '../../../core/services/my-translate';

@Component({
  selector: 'btnLang',
  imports: [],
  templateUrl: './btn-lang.html',
  styleUrl: './btn-lang.css',
})
export class BtnLang {
  private readonly myTranslate = inject(MyTranslate);

  lang: string = localStorage.getItem('lang') ?? 'en';

  change(lang: string): void {
    this.myTranslate.changeLage(lang);
    this.lang = lang;
  }
}
