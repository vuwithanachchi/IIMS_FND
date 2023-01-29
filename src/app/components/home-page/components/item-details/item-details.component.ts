import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  idLoading = true;
  apiResponse!: false;
  ItemDetailFrom!: FormGroup;
  checked = false;
  disabled = false;
  fileObj:any
  itemname!:any;
  itemdesc!:any;
  itemimg!:any;
  itemqty!:any;
  itemprice!:any;


  constructor(private http: HttpClient,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<ItemDetailsComponent>,) { }

  ngOnInit(): void {
    console.log(this.data);
    this.itemname = this.data[0].componetName;
    this.itemdesc = this.data[0].componetDesc;
    this.itemimg = this.data[0].imageURL;
    this.itemqty = this.data[0].qty;
    this.itemprice = this.data[0].unitPrice;

    // componetCode: "B0s01a"
    // componetDesc: "first componet"
    // componetID: 25
    // componetName: "IC001"
    // createtime: "2022-03-18T08:39:10.000Z"
    // imageURL: "42198673.png"
    // lastupdatetime: "2022-04-06T14:22:45.000Z"
    // qty: "23"
    // unitPrice: "234"
  }

  onNoClick(): void {
    this.dialogRef.close();

  }
}
