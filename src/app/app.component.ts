import { Component, ViewChild } from '@angular/core';
import { HomepageComponent } from './homepage/homepage.component';
import { WebService } from './web.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  generated:boolean = false
  constructor(public webService: WebService) { 
  }

  async refreshNews(){
    this.generated = await this.webService.regenerateNews()
    if (this.generated) {
      this.webService.refreshNews.next(true)
    }
  }
}
