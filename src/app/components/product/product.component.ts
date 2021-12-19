import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  products:Product[] = [];
  dataLoaded=false;

  constructor(private productService:ProductService ,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    //observable dönen data subscribe olmamız lazım...
    this.activatedRoute.params.subscribe(params=>{
      if(params["categoryId"])
      {
        this.getProductsByCategory(params["categoryId"]);
      }
      else
      {
        this.getProducts();
      }
    })

  }

  getProducts()
  {
    console.log("1-Api request başladı.")
    this.productService.getProducts().subscribe(response=>{ // getProducts().subscribe --->asenkron çalışır
     this.products=response.data;
     this.dataLoaded=true; //
     console.log("2-Api request bitti.")
   });
   console.log("3-Metod bitti.")
  }

  getProductsByCategory(categoryId:number)
  {
    this.productService.getProductsByCategory(categoryId).subscribe(response=>{
     this.products=response.data;
     this.dataLoaded=true;
   });
  }

}
