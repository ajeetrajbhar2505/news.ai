import { Component, OnInit } from '@angular/core';
import { WebService } from '../web.service';
import { Requestmodels } from '../models/Requestmodels.module';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit{
  active: boolean = false
  sportsNews:any = []
  private _unsubscribeAll!: Subject<any>;
  opensidebar() {
    this.active = !this.active
  }

  constructor(private webService: WebService) { }


  ngOnInit(): void {
    this.askQuestion('Sports')
  }


   askQuestion(topic:string) {
    this.webService.currentQuestion = topic
    const payload = {
      category : topic,
    }

    const req = new Requestmodels();
    req.RequestUrl = `NewsCategoryWise`;
    req.RequestObject = payload;

     this.webService
      .PostData(req)
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.status !== 200) {
              return;
            }
            this.sportsNews = data.response || []
          }
        },
        (_error) => {
          return;
        },
        () => { }
      );

  }

}
