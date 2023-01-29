import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  Url = environment.baseUrl;

  constructor(private http: HttpClient,private cookieService: CookieService) { }

  getTotalCount(): Observable<any> {
    return this.http.get(this.Url+'/component/countcomps', {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token'))
      })
    });

  }
}
