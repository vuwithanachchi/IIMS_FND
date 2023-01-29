import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie";
import {Observable} from "rxjs";
import {ShipDTO} from "../dto/shipDTO";

@Injectable({
  providedIn: 'root'
})
export class ShipService {

  Url = environment.baseUrl;

  constructor(private http: HttpClient,private cookieService: CookieService) { }

  getAllShip(): Observable<any> {
    return this.http.get(this.Url + '/ship/allship', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

      })
    });
  }

  deliverShip(shipDTO: ShipDTO)  : Observable<any> {
    return this.http.patch<any>(this.Url+'/ship/updateship/'+shipDTO.shippingid, {
      shippingid: shipDTO.shippingid,
      orderid: shipDTO.orderid,
      shippingdate: shipDTO.shippingdate,
      shippingaddress: shipDTO.shippingaddress,
      trackingnumber: shipDTO.trackingnumber,
      shippingstatus: shipDTO.shippingstatus
    }, {
      headers:new HttpHeaders({

        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }

  completeShip(shipDTO: ShipDTO)  : Observable<any> {
    return this.http.patch<any>(this.Url+'/ship/updateship/'+shipDTO.shippingid, {
      shippingid: shipDTO.shippingid,
      orderid: shipDTO.orderid,
      shippingdate: shipDTO.shippingdate,
      shippingaddress: shipDTO.shippingaddress,
      trackingnumber: shipDTO.trackingnumber,
      shippingstatus: shipDTO.shippingstatus
    }, {
      headers:new HttpHeaders({

        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }

  cancelShip(shipDTO: ShipDTO)  : Observable<any> {
    return this.http.patch<any>(this.Url+'/ship/updateship/'+shipDTO.shippingid, {
      shippingid: shipDTO.shippingid,
      orderid: shipDTO.orderid,
      shippingdate: shipDTO.shippingdate,
      shippingaddress: shipDTO.shippingaddress,
      trackingnumber: shipDTO.trackingnumber,
      shippingstatus: shipDTO.shippingstatus
    }, {
      headers:new HttpHeaders({

        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }
}
