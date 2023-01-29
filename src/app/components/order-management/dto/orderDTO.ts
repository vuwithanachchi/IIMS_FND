export class OrderDTO{
  private _orderid: string;
  private _userid: string;
  private _orderdate:string;
  private _orderamount: string;
  private _orderstatus:string;
  private _sippingaddress : string;
  private _paymentmethod : string;
  private _paymentstatus : string;


  constructor(orderid: string, userid: string, orderdate: string, orderamount: string, orderstatus: string, sippingaddress: string, paymentmethod: string, paymentstatus: string) {
    this._orderid = orderid;
    this._userid = userid;
    this._orderdate = orderdate;
    this._orderamount = orderamount;
    this._orderstatus = orderstatus;
    this._sippingaddress = sippingaddress;
    this._paymentmethod = paymentmethod;
    this._paymentstatus = paymentstatus;
  }

  get orderid(): string {
    return this._orderid;
  }

  set orderid(value: string) {
    this._orderid = value;
  }

  get userid(): string {
    return this._userid;
  }

  set userid(value: string) {
    this._userid = value;
  }

  get orderdate(): string {
    return this._orderdate;
  }

  set orderdate(value: string) {
    this._orderdate = value;
  }

  get orderamount(): string {
    return this._orderamount;
  }

  set orderamount(value: string) {
    this._orderamount = value;
  }

  get orderstatus(): string {
    return this._orderstatus;
  }

  set orderstatus(value: string) {
    this._orderstatus = value;
  }

  get sippingaddress(): string {
    return this._sippingaddress;
  }

  set sippingaddress(value: string) {
    this._sippingaddress = value;
  }

  get paymentmethod(): string {
    return this._paymentmethod;
  }

  set paymentmethod(value: string) {
    this._paymentmethod = value;
  }

  get paymentstatus(): string {
    return this._paymentstatus;
  }

  set paymentstatus(value: string) {
    this._paymentstatus = value;
  }
}
