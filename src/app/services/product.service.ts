import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ListResponseModel } from '../models/ListResponseModel';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  apiUrl='https://localhost:44346/api/'

  constructor(private httpClient:HttpClient) { }

  getProducts() :Observable<ListResponseModel<Product>>{
    let newPath=this.apiUrl+"Products/getall"
   return this.httpClient.get<ListResponseModel<Product>>(newPath);
   //dönüş tipi  : Observable , veri tipi:ProductResponseModel olacak şekilde çalışır.
  }

  getProductsByCategory(categoryId:number) :Observable<ListResponseModel<Product>>{
    let newPath=this.apiUrl+"Products/getbycategory?categoryId="+categoryId
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
    //dönüş tipi  : Observable , veri tipi:ProductResponseModel olacak şekilde çalışır.
   }

   add(product:Product):Observable<ResponseModel>
   {
     return this.httpClient.post<ResponseModel>(this.apiUrl+"products/add",product);
   }

}


