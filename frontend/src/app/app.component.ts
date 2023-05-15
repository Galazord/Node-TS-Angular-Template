import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(
    public translate: TranslateService,
  ){
    translate.addLangs(['en', 'es', 'fr']);
    const lang = translate.getBrowserLang()
    if(lang !== 'en' && lang !== 'es' && lang !== 'fr'){
      translate.setDefaultLang('en');
    }
    else{
      translate.setDefaultLang(lang);
    }
    
  }
}
