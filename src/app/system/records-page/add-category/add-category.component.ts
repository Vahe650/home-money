import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CategoryService} from '../../shared/services/category.service';
import {CategoryModel} from '../../shared/models/category.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'wfm-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy {
  @Output() onCategoryAdd = new EventEmitter<CategoryModel>();
  sub: Subscription;

  constructor(private categoryService: CategoryService) {
  }


  onSubmit(form: NgForm) {
    let {name, capacity} = form.value;
    if (capacity < 0) {
      capacity *= -1;
      name += '';
    }

    const category = new CategoryModel(name, capacity);
    this.categoryService.addCategory(category)
      .subscribe((categoryModel: CategoryModel) => {
        console.log(categoryModel);
      });
    form.reset();
    form.form.patchValue({capacity: 1});
    this.onCategoryAdd.emit(category);
    console.log(capacity);

  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
