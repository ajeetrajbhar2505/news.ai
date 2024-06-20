import { Component, OnInit } from '@angular/core';
import { WebService } from '../web.service';
import { Requestmodels } from '../models/Requestmodels.module';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
  active: boolean = false
  sportsNews: any = []
  private _unsubscribeAll!: Subject<any>;
  opensidebar() {
    this.active = !this.active
  }

  constructor(private webService: WebService, private router: Router) { }


  ngOnInit(): void {
    this.askQuestion('Sports')
  }

  routoToContent(contentId: string) {
    this.router.navigate(['content/' + contentId])
  }


  askQuestion(topic: string) {
    this.webService.currentQuestion = topic
    const payload = {
      category: topic,
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
