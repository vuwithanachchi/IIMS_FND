export class FoodDTO{
  private _fid: string;
  private _fname: string;
  private _fdesc: string;
  private _fimg : string;
  private _date : string;
  private _address : string;
  private _status : string;
  private _dname : string;
  private _dphoneNo1 : string;

  constructor(fid: string, fname: string, fdesc: string, fimg: string, date: string, address: string, status: string, dname: string, dphoneNo1: string) {
    this._fid = fid;
    this._fname = fname;
    this._fdesc = fdesc;
    this._fimg = fimg;
    this._date = date;
    this._address = address;
    this._status = status;
    this._dname = dname;
    this._dphoneNo1 = dphoneNo1;
  }

  get fid(): string {
    return this._fid;
  }

  set fid(value: string) {
    this._fid = value;
  }

  get fname(): string {
    return this._fname;
  }

  set fname(value: string) {
    this._fname = value;
  }

  get fdesc(): string {
    return this._fdesc;
  }

  set fdesc(value: string) {
    this._fdesc = value;
  }

  get fimg(): string {
    return this._fimg;
  }

  set fimg(value: string) {
    this._fimg = value;
  }

  get date(): string {
    return this._date;
  }

  set date(value: string) {
    this._date = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get dname(): string {
    return this._dname;
  }

  set dname(value: string) {
    this._dname = value;
  }

  get dphoneNo1(): string {
    return this._dphoneNo1;
  }

  set dphoneNo1(value: string) {
    this._dphoneNo1 = value;
  }
}
