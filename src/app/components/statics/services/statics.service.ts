import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StaticsService {

  Url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  Barpercentage(): Observable<any> {
    return this.http.get<any>(this.Url+'/user/countusers', {
      headers:new HttpHeaders({

      })
    })
  }

  Daughpercntage(): Observable<any> {
    return this.http.get<any>(this.Url+'/component/countcomps', {
      headers:new HttpHeaders({

      })
    })
  }
}
