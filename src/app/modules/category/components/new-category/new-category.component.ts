import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent {

  public categoryForm: FormGroup;
  estadoFormulario: string = "";

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<NewCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    if (data.id != null) {
      this.estadoFormulario = "Actualizar";
      this.categoryForm = this.fb.group({
        name: [data.name, Validators.required],
        description: [data.description, Validators.required]
      });

    } else {

      this.estadoFormulario = "Agregar";
      this.categoryForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required]
      });
    }

  }

  onSave() {
    let data = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    }

    if (this.data.id != null) {
      //update
      this.categoryService.updateCategory(data, this.data.id)
        .subscribe({
          next: () => this.dialogRef.close(1),
          error: () => this.dialogRef.close(2)
        });
    }else{
      //create
      this.categoryService.saveCategory(data)
      .subscribe({
        next: () => this.dialogRef.close(1),
        error: () => this.dialogRef.close(2)
      });
    }

  }

  onCancel() {
    this.dialogRef.close(0);
  }

}
