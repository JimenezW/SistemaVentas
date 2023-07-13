import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@shared/services/alert.service';
import { Observable } from 'rxjs';
import { Category, CategoryApi } from '../responses/category/category.response';
import { environment as dev } from 'src/environments/environment';
import { endpoint } from '@shared/apis/endpoint';
import { ListCategoryRequest } from '../requests/category/list-category-request';
import { map } from 'rxjs/operators';
import { CategoryRequest } from '../requests/category/category.request';
import { ApiResponse } from '../commons/response..interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private _http:HttpClient,
    private _alert:AlertService

  ) { }

  GetAll(size,sort,order,page,getInputs):Observable<CategoryApi>{
    const url=`${dev.api}${endpoint.LIST_CATEGORIES}`;
    const params:ListCategoryRequest=new ListCategoryRequest(
      page+1,order,sort,size,
      getInputs.numFilter,
      getInputs.textFilter,
      getInputs.stateFilter,
      getInputs.startDate,
      getInputs.endDate
    )

    return this._http.post<CategoryApi>(url, params).pipe(map((data)=>{
      data.data.items.forEach(e => {
        switch(e.state){
          case 0:
            e.badgeColor='text-gray bg-gray-light'
            break;
          case 1:
            e.badgeColor='text-green bg-green-light'
            break;
          default:
            e.badgeColor='text-gray bg-gray-light'
            break;
        }
      });

      return data;
    })

    )
  }

  CategoryRegister(category:CategoryRequest):Observable<ApiResponse>{
    const url=`${dev.api}${endpoint.CATEGORY_REGISTER}`;

    return this._http.post(url,category).pipe(
      map((res:ApiResponse)=>{
        return res;
      })
    );
  }

  CategoryById(CategoryId:number):Observable<Category>{
    const url=`${dev.api}${endpoint.CATEGORY_BY_ID}${CategoryId}`;

    return this._http.get(url).pipe(
      map((res:ApiResponse)=>{
        return res.data;
      })
    );
  }

  CategoryEdit(CategoryId:number,category:CategoryRequest):Observable<ApiResponse>{
    const url=`${dev.api}${endpoint.CATEGORY_EDIT}${CategoryId}`;

    return this._http.put(url,category).pipe(
      map((res:ApiResponse)=>{
        return res;
      })
    );
  }

  CategoryRemove(CategoryId:number):Observable<void>{
    const url=`${dev.api}${endpoint.CATEGORY_REMOVE}${CategoryId}`;

    return this._http.put(url,'').pipe(
      map((res:ApiResponse)=>{
        if(res.isSuccess)
          this._alert.success('Excelente', res.message);

      })
    );
  }

}
