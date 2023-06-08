import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@shared/services/alert.service';
import { Observable } from 'rxjs';
import { CategoryApi } from '../responses/category/category.response';
import { environment as dev } from 'src/environments/environment';
import { endpoint } from '@shared/apis/endpoint';
import { ListCategoryRequest } from '../requests/category/list-category-request';
import { map } from 'rxjs/operators';

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
}
