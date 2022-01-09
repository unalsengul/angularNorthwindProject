import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  products:Product[] = [];
  dataLoaded=false;
  filterText="";

  constructor(private productService:ProductService ,
    private activatedRoute:ActivatedRoute , private toastrService:ToastrService,private cartService:CartService  ) { }

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

  addToCart(product:Product)
  {
    if(product.productId===1)
    {
      this.toastrService.error("Bu ürün eklenemez","Hata");
    }
    else
    {
      this.toastrService.success("Sepete eklendi",product.productName);
      this.cartService.addToCart(product);
    }
  }

}
