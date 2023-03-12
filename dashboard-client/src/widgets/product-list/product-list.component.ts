import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../entities/products/model/product.service';

export interface IMetaData {
  total: number;
  current_page: number;
  per_page: number;
  from: number;
  to: number;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public products: any[] = [];
  public meta!: IMetaData;
  public loading: boolean = false;
  public currentPage: number = 1;
  public rows: number = 2;
  public mode: string = 'card';
  public sortType: string = '-createdAt';
  columnTitles: string[] = [
    'Наименование',
    'Категория',
    'Бренд',
    'Рейтинг',
    'Дата создания'
  ];
  columns: string[] = [
    'title',
    'category',
    'brand',
    'rating',
    'createdAt',
  ];
  public sortSettings: { title: string, slug: string }[] = [
    {
      title: 'Cначала новые',
      slug: '-createdAt'
    },
    {
      title: 'Cначала cтарые',
      slug: 'createdAt'
    },
    {
      title: 'По убыванию цены',
      slug: '-price'
    },
    {
      title: 'По возрастанию цены',
      slug: 'price'
    }
  ];
  public pageLimits: number[]= [1, 2, 4];
  constructor(
    private readonly productService: ProductService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  ngDoCheck(): void {
    console.log(this.sortType);
  }

  public getProducts(): void {
    this.loading = true;
    this.productService
      .getProducts(this.currentPage, this.rows, this.sortType)
      .subscribe((res: any) => {
        console.log(res);
        this.products = res.data;
        this.meta = {
          total: res.total,
          current_page: res.current_page,
          per_page: res.per_page,
          from: res.from,
          to: res.to,
        };
        this.loading = false;
      });
  }

  public handleChangeMode(mode: string): void {
    this.mode = mode;
    //this.persistanceService.set('it_objects_page_mode', mode);
  }

  public handleSelect(event: any): void {
    this.sortType = event
  }

  public paginate(page: number): void {
    this.currentPage = page;
    this.getProducts();
    this.router.navigate([`/autoparts`], {
      queryParams: {page: this.currentPage},
      queryParamsHandling: 'merge',
    });
  }

  public onChange(value: number): void {
    this.rows = value;
    this.router.navigate([`/autoparts`], {
      queryParams: {rows: this.rows},
      queryParamsHandling: 'merge',
    });
    this.getProducts();
  }

  public handleSort(): void {
    this.getProducts();
    this.router.navigate([`/autoparts`], {
      queryParams: {rows: this.rows},
      queryParamsHandling: 'merge',
    });
    //this.persistanceService.set('it_objects_page_mode', mode);
  }

}
