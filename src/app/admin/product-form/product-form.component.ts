import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;

  constructor(categoryService: CategoryService) {
    categoryService.getCategories().valueChanges().subscribe( category => {
      this.categories$ = category;
    })
   }

  ngOnInit() {

  }

}
