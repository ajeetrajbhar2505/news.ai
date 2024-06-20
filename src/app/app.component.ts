import { Component, ViewChild } from '@angular/core';
import { HomepageComponent } from './homepage/homepage.component';
import { WebService } from './web.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(public webService: WebService) { }

  refreshNews(){
    this.webService.regenerateNews()
  }
}
