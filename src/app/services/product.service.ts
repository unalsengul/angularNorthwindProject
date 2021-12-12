import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ListResponseModel } from '../models/ListResponseModel';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  apiUrl='https://localhost:44346/api/Products/getall'

  constructor(private httpClient:HttpClient) { }

  getProducts() :Observable<ListResponseModel<Product>>{
   return this.httpClient.get<ListResponseModel<Product>>(this.apiUrl);
   //dönüş tipi  : Observable , veri tipi:ProductResponseModel olacak şekilde çalışır.
  }
}

