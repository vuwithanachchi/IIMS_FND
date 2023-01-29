import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {CookieService} from "ngx-cookie";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ShipDTO} from "../../ship-management/dto/shipDTO";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  Url = environment.baseUrl;

  constructor(private http: HttpClient,private cookieService: CookieService) { }

  getAllPayment() : Observable<any> {
    return this.http.get(this.Url+'/payment/allpayments', {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token'))
      })
    });
  }

  addShip(shipDTO: ShipDTO)  : Observable<any> {
    return this.http.post<any>(this.Url+'/ship/saveship', {
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

  deleteaFood(orderid:any) {
    return this.http.delete(this.Url+'/payment/deletepayment/'+orderid, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',

      })
    });
  }
}
