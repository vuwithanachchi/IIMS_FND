import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Observable, Subject, Subscription, timeout} from "rxjs";
import {HttpClient, HttpEventType} from "@angular/common/http";
import {ManageItemsService} from "../../services/manage-items.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {SystemConfig} from "../../../../util/SystemConfig";
import {componentDTO} from "../../dto/componentDTO";
import {ApprovelDialogComponent} from "../../../../core/approvel-dialog/approvel-dialog.component";
import {ApprovalDialogConfig} from "../../../../core/approvel-dialog/model/ApprovalDialogConfig";
import {Filter} from "../../../../core/models/Filter";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ItemDetailsComponent} from "../../../home-page/components/item-details/item-details.component";
import {UpdateItemsComponent} from "../update-items/update-items.component";

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.scss']
})
export class AddNewItemComponent implements OnInit {

  idLoading = true;
  city: any;
  apiResponse!: false;
  itemDetailsForm!: FormGroup;
  brand: any;
  selectedFiles?: FileList;
  fileInfos?: Observable<any>;
  fileObj:any
  loading = false;
  loadings= true;
  imageInfos?: Observable<any>;

  constructor(private http: HttpClient,
              private itemsservice: ManageItemsService,
              public dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource(this.components);
    this.pageSizeOptions = SystemConfig.getPageSizes();
  }



  ngOnInit(): void {
    this.itemDetailsForm = new FormGroup({
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
      componetCode: new FormControl('', [
        Validators.required, Validators.pattern('^.{3,15}$')
      ]),
    });

    this.filterDetailsForm = new FormGroup({
      searchKeyWord: new FormControl('', [
        Validators.required
      ]),
      filter:new FormControl('ALL'),
      stateFilter:new FormControl('ACTIVATED')
    });
    this.search.pipe(
      debounceTime(SystemConfig.getDebounceTime()),
      distinctUntilChanged())
      .subscribe(() => {
        this.searchedWords = this.filterDetailsForm.get('searchKeyWord')?.value.trim().split(' ');
        this.refreshTable();

      });

  }

  fileDatas!: File;
  previewUrl!: null;
  fileUploadProgress!: string ;
  uploadedFilePath!: string ;
  message: string[] = [];
  progressInfos: any[] = [];
  previews: string[] = [];

  uploadFile(fileInput: any): void {
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


  saveItem() {
    // console.log(this.fileDatas.name)
    this.loading = true;
    this.loadings= false;
    // this.progressInfos[0] = {value: 0, fileName: this.fileDatas.name};
    // console.log("this.fileDatas")
    // console.log(this.fileDatas)
    // console.log("this.fileDatas")
    this.itemsservice.addComponent(new componentDTO(
      this.itemDetailsForm.get('componetName')?.value,
      this.itemDetailsForm.get('componetDesc')?.value,
      this.itemDetailsForm.get('imageURL')?.value,
      this.itemDetailsForm.get('qty')?.value,
      this.itemDetailsForm.get('unitPrice')?.value,
      this.itemDetailsForm.get('componetCode')?.value
    ),this.fileDatas).subscribe(res=>{
      console.log(res)
      if (res){

        this.loading = false;
        this.loadings= false;
        // const msg = 'Uploaded the file successfully: ' + this.fileDatas.name;
        // this.message.push(msg);
        // this.imageInfos = this.itemsservice.getFiles(this.itemDetailsForm.get('componetCode')?.value);
        // this.progressInfos[0].value = Math.round(100 * HttpEventType.UploadProgress);

        console.log("sucess")
        const approval5 = this.dialog.open(ApprovelDialogComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Alert', 'Successfully', 'Item Added Successfully')
        });
        approval5.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Item Added Successfully');
            this.itemDetailsForm.reset();
            this.refreshTable();
          }
        });
      }else{
        console.log("Nop")
        const approval4 = this.dialog.open(ApprovelDialogComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Item Add Unsuccessful')
        });
        approval4.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Item Add Unsuccessful');
          }
        });
      }
    });

  }

  // ==================================================================================================================


  filters: Filter[] = [{key: 'ALL', value: 'All'}, {key: 'NAME', value: 'Name'}, {key: 'DESC', value: 'Desc'}, {key: 'URL', value: 'Url'}, {
    key: 'QTY', value: 'qty'},{key: 'PRICE', value: 'Price'},{key: 'CODE', value: 'Code'}];
  components!: Array<componentDTO>[];
  displayedColumns: string[] = ['componetName', 'componetDesc', 'imageURL', 'qty', 'unitPrice', 'componetCode', 'action'];
  dataSource: MatTableDataSource<Array<componentDTO>>;
  private allComponentsSub!: Subscription;
  private searchComponentsSub!: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tempPageEvent!: PageEvent;
  filterDetailsForm!: FormGroup;
  search = new Subject();
  searchedWords!: string[];
  pageSizeOptions!: number[];
  pageCount = 0;

  loader = true;
  itemDetails!: any[];
  progressbar = true;

  ngAfterViewInit(): void {
    this.refreshTable();
  }

  public refreshPageCount(): void {
    if (this.paginator){
      console.log('refresh page count');
      this.pageCount = Math.ceil(this.paginator.length / this.paginator.pageSize);
      console.log('refresh page count after');
    }
  }

  pageNavigate(value: string): void {
    this.paginator.pageIndex = Number(value) - 1;
    this.paginator.page.next({
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      length: this.paginator.length
    });
  }

  Test($event: KeyboardEvent): void {
    console.log($event);
  }

  public refreshTable(): void {
    const searchKeyWord = this.filterDetailsForm.get('searchKeyWord')?.value;
    this.loadTable(String(this.paginator.pageIndex), String(this.paginator.pageSize));
    this.searchTable(searchKeyWord)
  }


  public loadTable(pageIndex: string, pageSize: string): void {
    this.allComponentsSub = this.itemsservice.getAllComponents(pageIndex, pageSize)
      .subscribe(result => {
        console.log("search items")
        console.log(result.data.data)
        this.paginator.length = result.data.data.length;
        this.dataSource = result.data.data;
        this.itemDetails =result.data.data;
        this.refreshPageCount();
      }, error => {
        console.log(error);
      });
  }

  searchTable(searchKeyWord: string): void {
    if (searchKeyWord!=='') {
      this.searchComponentsSub = this.itemsservice.searchComponent(searchKeyWord)
        .pipe(timeout(4000))
        .subscribe(result => {
          this.loader = false;
          console.log(result.data.data)
          this.paginator.length = result.data.data.length;
          this.dataSource = result.data.data;
          this.itemDetails = result.data.data;
          this.refreshPageCount();
        }, error => {
          console.log(error);
        });
    }else {
      console.log("not search")
    }
  }

  viewDetails(itemId:any): void {
    this.itemsservice.getItemDetails(itemId).subscribe(res => {
      console.log(res)
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = res;
      console.log('----------------------------');
      const dialogRef = this.dialog.open(ItemDetailsComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        this.loader = false;
        console.log("response code1")
        console.log(result)
        console.log("response code2")
        this.refreshTable();
      });

    })
  }



  updateCustomer(row: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.width = '100%';
    dialogConfig.height = '95%';
    console.log(row);
    console.log('----------------------------');
    const dialogRef = this.dialog.open(UpdateItemsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.loader = false;
      console.log("response code1")
      console.log(result)
      console.log("response code2")
      this.refreshTable();
    });
  }

  deleteCustomer(row: any): void {
    const approval = this.dialog.open(ApprovelDialogComponent, {
      width: '350px',
      data: new ApprovalDialogConfig('Delete', 'Warning !', 'Are you sure you want to delete '+row.componetName+' Item?')
    });
    approval.afterClosed().subscribe(approve => {
      if (approve) {
        this.loader = false;
        console.log(approve)
        this.itemsservice.deleteComponent(row.componetID).subscribe(res => {
          console.log(res);
          this.refreshTable();
        });

      }else{
        const approval4 = this.dialog.open(ApprovelDialogComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Item '+row.componetName+' Is Not Deleted')
        });
        approval4.afterClosed().subscribe(approve => {
          if (approve) {
            this.loader = false;
            this.refreshTable();

          }
        })
      }
    });
  }




  public getServerData(event: PageEvent): any {
    const searchKeyWord = this.filterDetailsForm.get('searchKeyWord')?.value;
    this.loadTable(String(event.pageIndex), String(event.pageSize));
    this.searchTable(searchKeyWord)
  }
}
