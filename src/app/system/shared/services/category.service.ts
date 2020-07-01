import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BillModel} from '../models/bill.model';
import {map} from 'rxjs/operators';
import {BaseApi} from '../../../shared/core/base.api';
import {CategoryModel} from '../models/category.model';

@Injectable()
export class CategoryService extends BaseApi {


  constructor(public http: HttpClient) {
    super(http);
  }

  addCategory(category: CategoryModel): Observable<CategoryModel> {
    return this.post('categories', category);
  }

  getCategories(): Observable<CategoryModel []> {
    return this.get('categories');
  }

  getCategory(id: number): Observable<CategoryModel > {
    return this.get(`categories/${id}`);
  }

  updateCategory(category: CategoryModel): Observable<CategoryModel> {
    return this.put(`categories/${category.categoryId}`, category);
  }

}
