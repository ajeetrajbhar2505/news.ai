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


  constructor(private http: HttpClient) { }


  PostData(req: Requestmodels): Observable<any> {
    return this.http
      .post<any>(environment.nodeApi + req.RequestUrl, req.RequestObject, {
        headers: this.headers,
      })
  }


}
