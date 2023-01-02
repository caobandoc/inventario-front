import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent {

  public categoryForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<NewCategoryComponent>,
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSave() {
    let data = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    }

    this.categoryService.saveCategory(data)
      .subscribe({
        next: data => {
          //console.log("respuesta categorias", data)
          this.dialogRef.close(1);
        },
        error: error => this.dialogRef.close(2)
      });

  }

  onCancel() {
    this.dialogRef.close(0);
  }

}
