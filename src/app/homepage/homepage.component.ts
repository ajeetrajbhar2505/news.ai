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
  News: any = []
  refreshNews:boolean = false
  private _unsubscribeAll!: Subject<any>;
  opensidebar() {
    this.active = !this.active
  }

  constructor(private webService: WebService, private router: Router) { }


  ngOnInit(): void {
    this.webService.refreshNews.subscribe(refreshNews => {
      this.refreshNews = refreshNews
      if (refreshNews) {
        this.askQuestion(this.webService.currentQuestion,this.refreshNews)
      }
    })
    this.askQuestion('Sports',false)
  }

  routoToContent(contentId: string) {
    this.router.navigate(['content/' + contentId])
  }


  askQuestion(topic: string,refreshNews:boolean) {
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
            const OldNews:any = this.News
            this.News = data.response || []
            if (OldNews.length > 0 && (refreshNews)) {
              for (const newsItem of this.News) {
                const found = OldNews.find((oldItem:any) => oldItem._id === newsItem._id);
                if (found) {
                  newsItem.new = false;
                } else {
                  newsItem.new = true;
                }
              }
            } else {
              // If OldNews is empty, mark all news items as new
              for (const newsItem of this.News) {
                newsItem.new = false;
              }
            }
            console.log(this.News);
            
          }
        },
        (_error) => {
          return;
        },
        () => { }
      );

  }

  formatDateString(dateString: any) {
    const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }

}
