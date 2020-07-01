import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CategoryModel} from '../../shared/models/category.model';
import {CategoryService} from '../../shared/services/category.service';
import {MessageModel} from '../../../shared/model/message.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'wfm-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  @Output() onCategoryEdit = new EventEmitter<CategoryModel>();
  @Input() categories: CategoryModel [] = [];
  sub: Subscription;

  currentCategoryId = 1;
  currentCategory: CategoryModel;
  message: MessageModel;

  constructor(private categoryService: CategoryService) {
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.message = new MessageModel('success', '');
    this.onCategoryChange();
  }

  onSubmit(form: NgForm) {
    let {capacity, name} = form.value;
    if (capacity) {
      capacity *= 1;
    }
    name += '';
    const category = new CategoryModel(name, capacity, this.currentCategoryId);
    this.categoryService.updateCategory(category)
      .subscribe((categ: CategoryModel) => {
        this.onCategoryEdit.emit(categ);
      });
    this.message.text = 'category was successfully updated';

    setTimeout(() => {
      this.message.text = '';
    }, 5000);

  }

  onCategoryChange() {
    console.log(this.currentCategoryId);
    this.currentCategory = this.categories
      .find(c => c.categoryId === +this.currentCategoryId);

  }
}
