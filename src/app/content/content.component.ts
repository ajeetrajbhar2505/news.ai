import { Component } from '@angular/core';
import { Requestmodels } from '../models/Requestmodels.module';
import { Subject } from 'rxjs';
import { WebService } from '../web.service';
import { ActivatedRoute } from '@angular/router';

interface Comment {
  user: string;
  comment: string;
  createdAt?: Date;
}

interface News extends Document {
  title: string;
  author: string;
  content: string;
  summary: string;
  category: string;
  tags: string[];
  publishedAt?: Date;
  imageUrl?: string;
  sourceUrl?: string;
  views?: number;
  comments: Comment[];
  createdAt?: any;
  updatedAt?: string;
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {
  news:any;

  private _unsubscribeAll!: Subject<any>;
  constructor(private webService: WebService,private route: ActivatedRoute) {
    this.newsDetails(this.route.snapshot.paramMap.get('id'))
  }

  newsDetails(topicId:any) {
    const payload = {
      _id: topicId,
    }

    const req = new Requestmodels();
    req.RequestUrl = `NewsIdWise`;
    req.RequestObject = payload;

    this.webService
      .PostData(req)
      .subscribe(
        (data) => {
          if (data != null) {
            if (data.status !== 200) {
              return;
            }
            this.news = data.response || []
            this.news.updatedAt = this.formatDateString(this.news.updatedAt)
          }
        },
        (_error) => {
          return;
        },
        () => { }
      );

  }

  formatDateString(dateString:any) {
    const options:any = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }
}
