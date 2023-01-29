import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {map, Observable, startWith, Subject, Subscription} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {CookieService} from "ngx-cookie";
import {OrderManagementService} from "./services/order-management.service";
import {FoodDTO} from "./dto/foodDTO";
import {PaymentDTO} from "./dto/paymentDTO";
import {ApprovelDialogComponent} from "../../core/approvel-dialog/approvel-dialog.component";
import {ApprovalDialogConfig} from "../../core/approvel-dialog/model/ApprovalDialogConfig";
import {OrderDTO} from "./dto/orderDTO";

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {

  complaintDetailsForm!: FormGroup;
  apiResponse: any;
  today:any
  filterComplaintsForm!: FormGroup;
  dataSource!: MatTableDataSource<Array<FoodDTO>>;
  displayedColumns: string[] = ['orderid','userid', 'orderdate', 'orderamount','orderstatus','sippingaddress','paymentmethod','paymentstatus','action'];
  pageCount = 0;
  pageSizeOptions!: number[];
  tempPageEvent!: PageEvent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  search = new Subject();
  private allItemSub!: Subscription;
  userdetail:any

  myControl = new FormControl('');
  options: string[] = ['Available', 'Unavailable'];
  filteredOptions!: Observable<string[]>;

  constructor(private complaintService: OrderManagementService,private dialog: MatDialog,
              private cookieService: CookieService) { }

  ngOnInit(): void {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.refreshTable();

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
    console.log("addPayment")
    console.log(row)
    this.complaintService.updateOrder(new OrderDTO(
      row.orderid,
      row.userid,
      row.orderdate,
      row.orderamount,
      "SHIPPED",
      row.sippingaddress,
      row.paymentmethod,
      "COMPLETED"
    )).subscribe(res=>{
      console.log(res)
      if (res){
        console.log("sucess")
        const approval5 = this.dialog.open(ApprovelDialogComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Alert', 'Successfully', 'Item Shipped Successfully')
        });
        approval5.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Item Shipped Successfully');
            // this.itemDetailsForm.reset();
            this.refreshTable();
          }
        });
      }else{
        console.log("Nop")
        const approval4 = this.dialog.open(ApprovelDialogComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Item Shipment Unsuccessful')
        });
        approval4.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Item Shipment Unsuccessful');
          }
        });
      }
    });
  }

  deleteComplaint(row:any) {



    this.complaintService.deleteaFood(row.orderid).subscribe(result => {
      console.log("Complaint Successfully deleted")
      // this.toastrService.error('Invalid Credentials!', 'Warning!');
      this.dialog.open(ApprovelDialogComponent, {
        width: '350px',
        data: new ApprovalDialogConfig('Error', 'Deleted', 'Order Deleted Successful')
      });
      console.log(result)
      this.loadTable();
    }, error => {
      console.log(error);
    });
  }

  private loadTable(): void {
    this.allItemSub = this.complaintService.getAllOrders()
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

  addPayment(row:any) {
    console.log("addPayment")
    console.log(row)
    this.complaintService.AddPayment(new PaymentDTO(
      "",
      row.orderid,
      new Date().toISOString().slice(0, 10),
      row.orderamount,
      row.paymentmethod,
      "COMPLETED"
    )).subscribe(res=>{
      console.log(res)
      if (res){
        console.log("sucess")
        const approval5 = this.dialog.open(ApprovelDialogComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Alert', 'Successfully', 'Payment Updated Successfully')
        });
        approval5.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Payment Updated Successfully');
            // this.itemDetailsForm.reset();
            this.refreshTable();
          }
        });
      }else{
        console.log("Nop")
        const approval4 = this.dialog.open(ApprovelDialogComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Payment Update Unsuccessful')
        });
        approval4.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Payment Update Unsuccessful');
          }
        });
      }
    });
  }
}
