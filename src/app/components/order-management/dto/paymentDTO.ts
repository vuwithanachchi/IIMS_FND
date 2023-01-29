export class PaymentDTO{
  private _paymentid: string;
  private _orderid: string;
  private _paymentdate: string;
  private _paymentamount : string;
  private _paymentmethod : string;
  private _paymentstatus : string;

  constructor(paymentid: string, orderid: string, paymentdate: string, paymentamount: string, paymentmethod: string, paymentstatus: string) {
    this._paymentid = paymentid;
    this._orderid = orderid;
    this._paymentdate = paymentdate;
    this._paymentamount = paymentamount;
    this._paymentmethod = paymentmethod;
    this._paymentstatus = paymentstatus;
  }

  get paymentid(): string {
    return this._paymentid;
  }

  set paymentid(value: string) {
    this._paymentid = value;
  }

  get orderid(): string {
    return this._orderid;
  }

  set orderid(value: string) {
    this._orderid = value;
  }

  get paymentdate(): string {
    return this._paymentdate;
  }

  set paymentdate(value: string) {
    this._paymentdate = value;
  }

  get paymentamount(): string {
    return this._paymentamount;
  }

  set paymentamount(value: string) {
    this._paymentamount = value;
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
