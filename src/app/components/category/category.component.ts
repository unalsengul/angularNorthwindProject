import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  currentCategory:Category;
  categories:Category[] = [];


  constructor(private categoryservice:CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories()
  {
    this.categoryservice.getCategories().subscribe(response=>{ // getProducts().subscribe --->asenkron çalışır
     this.categories=response.data;
   });
  }

  setCurrentCategory(category:Category)
  {
    this.currentCategory=category;
    console.log(category.categoryName);
  }

  getCurrentCategoryClass(category:Category)
  {
    if(this.currentCategory==category)
     return "list-group-item active";
     else
     return"list-group-item";
  }

}
