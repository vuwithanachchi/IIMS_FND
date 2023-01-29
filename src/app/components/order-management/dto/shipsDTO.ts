export class ShipsDTO{
  private _shippingid: string;
  private _orderid: string;
  private _shippingdate:string;
  private _shippingaddress: string;
  private _trackingnumber:string;
  private _shippingstatus : string;

  constructor(shippingid: string, orderid: string, shippingdate: string, shippingaddress: string, trackingnumber: string, shippingstatus: string) {
    this._shippingid = shippingid;
    this._orderid = orderid;
    this._shippingdate = shippingdate;
    this._shippingaddress = shippingaddress;
    this._trackingnumber = trackingnumber;
    this._shippingstatus = shippingstatus;
  }

  get shippingid(): string {
    return this._shippingid;
  }

  set shippingid(value: string) {
    this._shippingid = value;
  }

  get orderid(): string {
    return this._orderid;
  }

  set orderid(value: string) {
    this._orderid = value;
  }

  get shippingdate(): string {
    return this._shippingdate;
  }

  set shippingdate(value: string) {
    this._shippingdate = value;
  }

  get shippingaddress(): string {
    return this._shippingaddress;
  }

  set shippingaddress(value: string) {
    this._shippingaddress = value;
  }

  get trackingnumber(): string {
    return this._trackingnumber;
  }

  set trackingnumber(value: string) {
    this._trackingnumber = value;
  }

  get shippingstatus(): string {
    return this._shippingstatus;
  }

  set shippingstatus(value: string) {
    this._shippingstatus = value;
  }
}
