import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {CookieService} from "ngx-cookie";
import {PaymentDTO} from "../dto/paymentDTO";
import {OrderDTO} from "../dto/orderDTO";

@Injectable({
  providedIn: 'root'
})
export class OrderManagementService {

  Url = environment.baseUrl;

  constructor(private http: HttpClient,private cookieService: CookieService) { }

  getAllOrders() : Observable<any> {
    return this.http.get(this.Url+'/order/allorders', {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',

      })
    });
  }

  AddPayment(paymentDTO: PaymentDTO) : Observable<any> {
    return this.http.post<any>(this.Url+'/payment/savepayment', {
      paymentid: paymentDTO.paymentid,
      orderid: paymentDTO.orderid,
      paymentdate: paymentDTO.paymentdate,
      paymentamount: paymentDTO.paymentamount,
      paymentmethod: paymentDTO.paymentmethod,
      paymentstatus: paymentDTO.paymentstatus
    }, {
      headers:new HttpHeaders({

        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }

  updateOrder(orderDTO: OrderDTO): Observable<any> {
      return this.http.patch<any>(this.Url+'/order/updateorder/'+orderDTO.orderid, {
        orderid: orderDTO.orderid,
        userid: orderDTO.userid,
        orderdate: orderDTO.orderdate,
        orderamount: orderDTO.orderamount,
        orderstatus: orderDTO.orderstatus,
        sippingaddress: orderDTO.sippingaddress,
        paymentmethod: orderDTO.paymentmethod,
        paymentstatus: orderDTO.paymentstatus,
      }, {
        headers:new HttpHeaders({

          // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
        })
      })
  }

  deleteaFood(cid: any) {
    return this.http.delete(this.Url+'/order/deleteorder/'+cid, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',

      })
    });
  }
}
