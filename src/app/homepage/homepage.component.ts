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
    this.askQuestion('sports')
  }


   askQuestion(topic:string) {
    const payload = {
      "prompt": `could you give news on ${topic} of India, i want to integrate in frontend so i wsnt title  and description of that,title should be in title key and dexription in description`
    }

    const req = new Requestmodels();
    req.RequestUrl = `askQuestion`;
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
