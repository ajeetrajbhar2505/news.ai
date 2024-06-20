import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, tap, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { Requestmodels } from './models/Requestmodels.module';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  headers: any = new Headers({});
  currentQuestion:string = ""
  rotate:boolean = false

  constructor(private http: HttpClient) { }


  PostData(req: Requestmodels): Observable<any> {
    return this.http
      .post<any>(environment.nodeApi + req.RequestUrl, req.RequestObject, {
        headers: this.headers,
      })
  }

  regenerateNews(topic = this.currentQuestion || 'Sports'){
    this.rotate = true
    const payload = {
      category : topic,
      "prompt": `could you give news on ${topic} of India, i want to integrate in frontend so i was title  and description of that,title should be in title key and dexription in description`
    }

    const req = new Requestmodels();
    req.RequestUrl = `askQuestion`;
    req.RequestObject = payload;

     this
      .PostData(req)
      .subscribe(
        (data) => {
          if (data != null) {
            this.rotate = false
            if (data.status !== 200) {
              return;
            }
          }
        },
        (_error) => {
          return;
        },
        () => { }
      );
  }

}
