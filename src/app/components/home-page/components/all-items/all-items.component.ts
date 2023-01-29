import {Component, OnInit, ViewChild} from '@angular/core';
import {Filter} from "../../../../core/models/Filter";
import {componentDTO} from "../../../manage-items/dto/componentDTO";
import {MatTableDataSource} from "@angular/material/table";
import {debounceTime, distinctUntilChanged, Subject, Subscription, timeout} from "rxjs";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SystemConfig} from "../../../../util/SystemConfig";
import {ManageItemsService} from "../../../manage-items/services/manage-items.service";
import {ItemDetailsComponent} from "../item-details/item-details.component";

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.scss']
})
export class AllItemsComponent implements OnInit {

  filters: Filter[] = [{key: 'ALL', value: 'All'}, {key: 'NAME', value: 'Name'}, {key: 'DESC', value: 'Desc'}, {key: 'URL', value: 'Url'}, {
    key: 'QTY', value: 'qty'},{key: 'PRICE', value: 'Price'},{key: 'CODE', value: 'Code'}];
  components!: Array<componentDTO>[];
  displayedColumns: string[] = ['componetName', 'componetDesc', 'imageURL', 'qty', 'unitPrice', 'componetCode'];
  dataSource: MatTableDataSource<Array<componentDTO>>;
  itemDetails!: any[];
  private allComponentsSub2!: Subscription;
  private searchComponentsSub2!: Subscription;
  private searchItemsSub!: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tempPageEvent!: PageEvent;
  filterDetailsForm!: FormGroup;
  search = new Subject();
  searchedWords!: string[];
  pageSizeOptions!: number[];
  pageCount = 0;

  constructor(public dialog: MatDialog,
              private itemsservice2:ManageItemsService) {
    this.dataSource = new MatTableDataSource(this.components);
    this.pageSizeOptions = SystemConfig.getPageSizes();
  }

  ngOnInit(): void {
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

  refreshTable(): void {
    const searchKeyWord = this.filterDetailsForm.get('searchKeyWord')?.value;
    this.loadTable2(String(this.paginator.pageIndex), String(this.paginator.pageSize));
    this.searchTable2(searchKeyWord)
  }

  // public loadTable2(pageIndex: string, pageSize: string): void {
  //   this.allComponentsSub2 = this.itemsservice2.getAllComponents(pageIndex, pageSize)
  //     .subscribe(result => {
  //       console.log(result.content)
  //       this.paginator.length = result.content.length;
  //       this.dataSource = result.content;
  //       this.itemDetails =result.content;
  //       this.refreshPageCount();
  //     }, error => {
  //       console.log(error);
  //     });
  // }

  public loadTable2(pageIndex: string, pageSize: string): void {
    this.allComponentsSub2 = this.itemsservice2.getAllComponents(pageIndex, pageSize)
      .subscribe(result => {
        console.log(result)
        this.paginator.length = result.data.data.length;
        this.dataSource = result.data.data;
        this.itemDetails =result.data.data;
        this.refreshPageCount();
      }, error => {
        console.log(error);
      });
  }

  searchTable2(searchKeyWord: string): void {
    if (searchKeyWord!=='') {
      this.searchComponentsSub2 = this.itemsservice2.searchComponent(searchKeyWord)
        .pipe(timeout(4000))
        .subscribe(result => {
          if (result.content){
            console.log("search items")
          console.log(result.content)
          this.paginator.length = result.content.length;
          this.dataSource = result.content;
          this.itemDetails =result.content;
          this.refreshPageCount();
            console.log("search finish")
          }else{
            console.log("not search")
          }
        }, error => {
          console.log(error);
        });
    }else {
      console.log("not search")
    }
  }

  public getServerData(event: PageEvent): any {
    const searchKeyWord = this.filterDetailsForm.get('searchKeyWord')?.value;
    this.loadTable2(String(event.pageIndex), String(event.pageSize));
    this.searchTable2(searchKeyWord)
  }

  loader = true;

  viewDetails(itemId:any): void {
    this.itemsservice2.getItemDetails(itemId).subscribe(res=>{
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
}
