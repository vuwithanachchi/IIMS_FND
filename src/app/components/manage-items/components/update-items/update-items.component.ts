import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ManageItemsService} from "../../services/manage-items.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {updateDTO} from "../../dto/UpdateCompDTO";
import {ApprovelDialogComponent} from "../../../../core/approvel-dialog/approvel-dialog.component";
import {ApprovalDialogConfig} from "../../../../core/approvel-dialog/model/ApprovalDialogConfig";

@Component({
  selector: 'app-update-items',
  templateUrl: './update-items.component.html',
  styleUrls: ['./update-items.component.scss']
})
export class UpdateItemsComponent implements OnInit {

  idLoading = true;
  apiResponse!: false;
  UpdateItemsFrom!: FormGroup;
  checked = false;
  disabled = false;
  fileObj:any
  imgURL:any;
  loading = false;
  loadings= true;
  datas= true;
  previews: string[] = [];
  message: string[] = [];
  progressbar = true;
  progressInfos: any[] = [];

  constructor(private http: HttpClient,
              private itemsservice : ManageItemsService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<UpdateItemsComponent>,) { }


  ngOnInit(): void {
    this.UpdateItemsFrom = new FormGroup({
      componetID: new FormControl('', [
        Validators.required,
      ]),
      componetName: new FormControl('', [
        Validators.required, Validators.pattern('^.{3,20}$')
      ]),
      componetDesc: new FormControl('', [
        Validators.required, Validators.pattern('^.{3,200}$')
      ]),
      imageURL: new FormControl('', [
        Validators.required
      ]),
      qty: new FormControl('', [
        Validators.required, Validators.pattern('^[0-9]{1,7}$')
      ]),
      unitPrice: new FormControl('', [
        Validators.required, Validators.pattern('^[0-9]{2,7}$')
      ]),
      componetCode  : new FormControl('', [
        Validators.required, Validators.pattern('^.{3,15}$')
      ]),
    });

    console.log(this.data);
    this.imgURL = this.data.imageURL;

    this.UpdateItemsFrom.setValue({
      componetID: this.data.componetID,
      componetName: this.data.componetName,
      componetDesc: this.data.componetDesc,
      imageURL: this.data.imageURL,
      qty: this.data.qty,
      unitPrice: this.data.unitPrice,
      componetCode: this.data.componetCode,
    });
  }
  fileDatas!: File;


  uploadFile(fileInput: any): void {
    this.datas=false;
    this.message = [];
    this.progressInfos = [];
    this.fileDatas = <File>fileInput.target.files[0];
    this.previews = [];

    if (this.fileDatas) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log(e.target.result);
        this.previews.push(e.target.result);
      };
      reader.readAsDataURL(this.fileDatas);
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      console.log(e.target.result);
      this.previews.push(e.target.result);
    };

  }




  saveItemss() {
    this.itemsservice.updateComponents(new updateDTO(
      this.UpdateItemsFrom.get('componetID')?.value,
      this.UpdateItemsFrom.get('componetName')?.value,
      this.UpdateItemsFrom.get('componetDesc')?.value,
      this.UpdateItemsFrom.get('imageURL')?.value,
      this.UpdateItemsFrom.get('qty')?.value,
      this.UpdateItemsFrom.get('unitPrice')?.value,
      this.UpdateItemsFrom.get('componetCode')?.value
    ),this.fileDatas).subscribe(res=>{
      console.log(res)
      if (res){
        this.dialogRef.close();
        const approval5 = this.dialog.open(ApprovelDialogComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Alert', 'Successfully', 'Item '+this.data.componetName+' Is Updated')
        });
        approval5.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Item '+this.data.componetName+' Is Updated');
          }
        });
      }else{
        const approval4 = this.dialog.open(ApprovelDialogComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Item '+this.data.componetName+' Is Not Updated')
        });
        approval4.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Item '+this.data.componetName+' Is Not Updated');
            this.datas=true;
          }
        });
      }
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
    const approval4 = this.dialog.open(ApprovelDialogComponent, {
      width: '350px',
      data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Item '+this.data.componetName+' Is Not Updated')
    });
    approval4.afterClosed().subscribe(approve => {
      if (approve) {
        console.log('Item '+this.data.componetName+' Is Not Updated');
      }
    });
  }

}
