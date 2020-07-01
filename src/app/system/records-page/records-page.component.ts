import {Component, OnInit} from '@angular/core';
import {CategoryModel} from '../shared/models/category.model';
import {CategoryService} from '../shared/services/category.service';

@Component({
  selector: 'wfm-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {

  categories: CategoryModel[] = [];
  isLoaded = false;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories: CategoryModel []) => {
      this.categories = categories[`_embedded`][`categories`];
      this.isLoaded = true;
      console.log(categories);
    });
  }

  newCategoryAdded(category: CategoryModel) {
    this.categories.push(category);

  }

  categoryIsEdited(category: CategoryModel) {
    const index = this.categories.findIndex(c => c.categoryId === category.categoryId);
    this.categories[index] = category;

  }
}
