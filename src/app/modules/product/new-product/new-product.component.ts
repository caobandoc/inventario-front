import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryElement } from 'src/app/models/category-element.model';
import { CategoryService } from '../../shared/services/category.service';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  public productForm: FormGroup;
  estadoFormulario: string = "";
  categories: CategoryElement[] = [];
  selectedFile: any;
  nameImg: string = "";

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<NewProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    if (data.id != null) {
      this.estadoFormulario = "Actualizar";
      this.productForm = this.fb.group({
        name: [data.name, Validators.required],
        price: [data.price, Validators.required],
        account: [data.account, Validators.required],
        category: [data.category.id, Validators.required],
        picture: [data.picture, Validators.required]
      });

    } else {

      this.estadoFormulario = "Agregar";
      this.productForm = this.fb.group({
        name: ['', Validators.required],
        price: ['', Validators.required],
        account: ['', Validators.required],
        category: ['', Validators.required],
        picture: ['', Validators.required]
      });
    }
  }

  ngOnInit(): void {
    this.getCategories();
  }

  onSave() {
    let data = {
      name: this.productForm.get('name')?.value,
      price: this.productForm.get('price')?.value,
      account: this.productForm.get('account')?.value,
      category: this.productForm.get('category')?.value,
      picture: this.selectedFile
    }

    const uploadImageData = new FormData();
    uploadImageData.append('picture', data.picture, data.picture.name);
    uploadImageData.append('name', data.name);
    uploadImageData.append('price', data.price);
    uploadImageData.append('account', data.account);
    uploadImageData.append('categoryId', data.category);



    if (this.data.id != null) {
      //update
      this.productService.updateProduct(uploadImageData, this.data.id)
        .subscribe({
          next: () => this.dialogRef.close(1),
          error: () => this.dialogRef.close(2)
        });
    } else {
      //create
      this.productService.saveProduct(uploadImageData)
        .subscribe({
          next: () => this.dialogRef.close(1),
          error: () => this.dialogRef.close(2)
        });
    }

  }

  onCancel() {
    this.dialogRef.close(0);
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe({
        next: (data: any) => this.categories = data.categoryResponse.categoryList,
        error: (error) => console.log(error)
      });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    this.nameImg = this.selectedFile.name;
    console.log(this.nameImg);
  }
}
