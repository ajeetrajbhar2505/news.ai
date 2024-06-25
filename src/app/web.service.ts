import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, retry, tap, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { Requestmodels } from './models/Requestmodels.module';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  headers: any = new Headers({});
  currentQuestion: string = ""
  rotate: boolean = false
  refreshNews: Subject<boolean> = new Subject<boolean>()
  isrefreshed: Subject<boolean> = new Subject<boolean>()

  constructor(private http: HttpClient) { 
  }


  PostData(req: Requestmodels): Observable<any> {
    return this.http
      .post<any>(environment.nodeApi + req.RequestUrl, req.RequestObject, {
        headers: this.headers,
      })
  }

  regenerateNews(topic = this.currentQuestion || 'Sports'): Promise<boolean> {
    this.rotate = true;
    const payload = {
      category: topic,
      prompt: `could you give news on ${topic} of India at least 50 lines, I want to integrate in frontend so I want title and description of that, title should be in title key and description in description`
    };

    const req = new Requestmodels();
    req.RequestUrl = `askQuestion`;
    req.RequestObject = payload;

    return new Promise((resolve, reject) => {
      this.PostData(req).subscribe(
        (data) => {
          this.rotate = false;
          if (data != null && data.status === 200) {
            resolve(data.response.length > 0);
          } else {
            resolve(false);
          }
        },
        (_error) => {
          this.rotate = false;
          resolve(false);
        }
      );
    });
  }




}
