import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {FoodDTO} from "../order-management/dto/foodDTO";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {map, Observable, startWith, Subject, Subscription} from "rxjs";
import {OrderManagementService} from "../order-management/services/order-management.service";
import {MatDialog} from "@angular/material/dialog";
import {CookieService} from "ngx-cookie";
import {PaymentService} from "./services/payment.service";
import {OrderDTO} from "../order-management/dto/orderDTO";
import {ApprovelDialogComponent} from "../../core/approvel-dialog/approvel-dialog.component";
import {ApprovalDialogConfig} from "../../core/approvel-dialog/model/ApprovalDialogConfig";
import {ShipDTO} from "../ship-management/dto/shipDTO";

@Component({
  selector: 'app-payment-management',
  templateUrl: './payment-management.component.html',
  styleUrls: ['./payment-management.component.scss']
})
export class PaymentManagementComponent implements OnInit {

  complaintDetailsForm!: FormGroup;
  apiResponse: any;
  today:any
  filterComplaintsForm!: FormGroup;
  dataSource!: MatTableDataSource<Array<FoodDTO>>;
  displayedColumns: string[] = ['paymentid','orderid', 'paymentdate', 'paymentamount','paymentmethod','paymentstatus','action'];
  pageCount = 0;
  pageSizeOptions!: number[];
  tempPageEvent!: PageEvent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  search = new Subject();
  private allItemSub!: Subscription;
  userdetail:any
  ramnum!: string

  myControl = new FormControl('');
  options: string[] = ['Available', 'Unavailable'];
  filteredOptions!: Observable<string[]>;

  constructor(private complaintService: PaymentService,private dialog: MatDialog,
              private cookieService: CookieService) { }

  ngOnInit(): void {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.refreshTable();
    this.makeid()
  }

  ngAfterViewInit(): void {
    this.refreshTable();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  Test($event: KeyboardEvent) {

  }


  saveComplaint() {
    // this.userdetail = JSON.parse(<string>this.cookieService.get('VArr'))
    // this.complaintService.saveaFood(new FoodDTO(
    //   "",
    //   this.complaintDetailsForm.get('fname')?.value,
    //   this.complaintDetailsForm.get('fdesc')?.value,
    //   "",
    //   new Date().toISOString().slice(0, 10),
    //   this.complaintDetailsForm.get('address')?.value,
    //   this.complaintDetailsForm.get('status')?.value,
    //   this.userdetail[0].dname,
    //   this.userdetail[0].dphoneNo1,
    // )).subscribe(result => {
    //   console.log("Food Successfully Added")
    //   // this.toastrService.success('Food Item Added Successfully!', 'Success!');
    //   console.log(result)
    //   this.loadTable();
    //   this.resetfields();
    //
    // }, error => {
    //   console.log(error);
    // });
  }

  resetfields(){
    // this.complaintDetailsForm.setValue({
    //   fname:'',
    //   fdesc:'',
    //   address :'',
    //   status :''
    // })
  }

  refreshTable(): void {
    this.loadTable();
  }

  updateComplaint(row:any) {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.data = row;
    // dialogConfig.width = '55%';
    // dialogConfig.height = '55%';
    // console.log(row);
    // console.log('----------------------------');
    // const dialogRef = this.dialog.open(UpdateFoodComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(result);
    //   this.refreshTable();
    // });
  }

  deleteComplaint(row:any) {
    this.complaintService.deleteaFood(row.paymentid).subscribe(result => {
      console.log("Complaint Successfully deleted")
      // this.toastrService.error('Invalid Credentials!', 'Warning!');
      this.dialog.open(ApprovelDialogComponent, {
        width: '350px',
        data: new ApprovalDialogConfig('Error', 'Deleted', 'Payment Deleted Successful')
      });
      console.log(result)
      this.loadTable();
    }, error => {
      console.log(error);
    });
  }

  private loadTable(): void {
    this.allItemSub = this.complaintService.getAllPayment()
      .subscribe(result => {
        console.log("result")
        console.log(result)
        this.paginator.length = result.length;
        this.dataSource = result;
        // console.log(result.data);
      }, error => {
        console.log(error);
      });
  }

  pageNavigate(value: string): void {
    this.paginator.pageIndex = Number(value) - 1;
    this.paginator.page.next({
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      length: this.paginator.length
    });
  }

  getServerData($event: PageEvent): any {

  }

  makeid() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = 5;
    let counter = 0;
    while (counter < 5) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    this.ramnum = result

    // return result;
  }

  addShipment(row:any) {
    console.log("addPayment")
    console.log(row)
    this.complaintService.addShip(new ShipDTO(
      "",
      row.orderid,
      new Date().toISOString().slice(0, 10),
      "COLOMBO",
      this.ramnum,
      "DISPATCHED"
    )).subscribe(res=>{
      console.log(res)
      if (res){
        console.log("sucess")
        const approval5 = this.dialog.open(ApprovelDialogComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Alert', 'Successfully', 'Added To Shipment Successfully')
        });
        approval5.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Added To Shipment Successfully');
            // this.itemDetailsForm.reset();
            // this.refreshTable();
          }
        });
      }else{
        console.log("Nop")
        const approval4 = this.dialog.open(ApprovelDialogComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Item Adding Unsuccessful')
        });
        approval4.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Item Adding Unsuccessful');
          }
        });
      }
    });
  }
}
