import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { scaleFadeIn400ms } from 'src/@vex/animations/scale-fade-in.animation';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { MatPaginator } from '@angular/material/paginator';
import { getEsPaginatorIntl } from '@shared/paginator-intl/es-paginator-intl';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { DefaultService } from '@shared/services/default.service';
import { TableColumns, TableFooter } from '../../interfaces/list-table.interfaces';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '@shared/services/alert.service';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-list-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss'],
  animations: [scaleFadeIn400ms, fadeInRight400ms],
  providers: [
    {
      provide: MatPaginator,
      useValue: getEsPaginatorIntl()
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearence: 'standard' } as MatFormFieldDefaultOptions
    }
  ]
})
export class ListTableComponent<T> implements OnInit, AfterViewInit, OnChanges {

  @Input() sevice?: DefaultService;
  @Input() columns?: TableColumns<T>[];
  @Input() getInputs: any;
  @Input() sortBy?: string;
  @Input() sortDir: string = 'asc';
  @Input() footer: TableFooter<T>[];

  @Output() rowClick = new EventEmitter<T>();

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  chagesGetInputs = new EventEmitter<T>();

  dataSource = new MatTableDataSource<T>();

  visibleColumns?: Array<keyof T | string>;
  visibleFooter?: Array<keyof T | string | object>;

  paginatorOption = {
    pageSizeOptions: [10, 20, 50],
    pageZise: 10,
    pageLength: 0
  }

  constructor(
    private _spinner: NgxSpinnerService,
    private _alert: AlertService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void {
    this.getDataByService();
    this.sortChanges();
    this.paginatorChanges();
    //throw new Error('Method not implemented.');
  }

  ngOnChanges(changes: SimpleChanges): void {
    //throw new Error('Method not implemented.');
    if (changes.columns) {
      this.setVibleColumns();
    }

    if (changes.getInputs && this.paginator) {
      this.paginator.pageIndex = 0;
      this.chagesGetInputs.emit();
    }

  }

  setVibleColumns() {
    this.visibleColumns = this.columns.filter((col: any) => col.visible).map((col: any) => col.property);
  }

  async getDataByService() {
    this.chagesGetInputs.pipe(
      startWith(''),
      switchMap(() => {
        this._spinner.show('modal-table');
        return this.sevice.GetAll(
          this.paginator.pageSize,
          this.sort.active,
          this.sort.direction,
          this.paginator.pageIndex,
          this.getInputs
        );
      })
    ).subscribe((data: any) => {
      this.setData(data);
      this._spinner.hide('modal-table');
    })
  }

  setData(data: any) {
    if (data.isSuccess) {
      this.setVibleColumns();
      this.paginatorOption.pageLength = data.data.totalRecords
      this.dataSource.data = data.data.items;

      if (data.data.footer) this.setFooter(data.data.footer);

    }else{
      this._alert.warn("Atención",'Ha ocurrido un error al cargar los datos')
    }
  }

  setFooter(data: any) {
    this.visibleFooter = [];

    if (this.footer.length && data) {
      this.footer.forEach((e) => {
        this.visibleFooter.push({
          label: e.label,
          value: data[e.property],
          tooltip: e.tooltip
        });
      });

    }
  }

  sortChanges(){
    this.sort.sortChange.subscribe(()=>{
      this.paginator.pageIndex = 0;
      this.chagesGetInputs.emit();
    });
  }

  paginatorChanges(){
    this.paginator.page.subscribe(()=>{
      //this.paginator.pageIndex = 0;
      this.chagesGetInputs.emit();
    });
  }




}
