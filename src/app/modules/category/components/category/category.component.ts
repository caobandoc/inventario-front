import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryElement } from 'src/app/models/category-element.model';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe({
        next: data => {
          //console.log("respuesta categorias", data)
          this.processCategoriesResponse(data);
        },
        error: error => console.log("error", error)
      });
  }

  processCategoriesResponse(resp: any) {
    const dataCategory: CategoryElement[] = [];
    if (resp.metadata[0].code == "00") {

      let listCategory = resp.categoryResponse.categoryList;

      listCategory.forEach((element: CategoryElement) => {
        dataCategory.push(element);
      });

      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
    }
  }

  openCategoryDialog() {
    const dialogRef = this.dialog.open(NewCategoryComponent , {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result == 1) {
          this.openSnackBar("Categoría agregada", "Exitosa");
          this.getCategories();
        } else if (result == 2) {
          this.openSnackBar("Error al crear la categoría", "Error");
        }
      });
  }

  edit(element: any) {
    const dialogRef = this.dialog.open(NewCategoryComponent , {
      width: '500px',
      data: {
        id: element.id,
        name: element.name,
        description: element.description
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result == 1) {
          this.openSnackBar("Categoría actualizada", "Exitosa");
          this.getCategories();
        } else if (result == 2) {
          this.openSnackBar("Error al actualizar la categoría", "Error");
        }
      });
  }

  delete(id: string) {
    const dialogRef = this.dialog.open(ConfirmComponent , {
      //width: '500px',
      data: {
        id: id,
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result == 1) {
          this.openSnackBar("Categoría eliminada", "Exitosa");
          this.getCategories();
        } else if (result == 2) {
          this.openSnackBar("Error al eliminar la categoría", "Error");
        }
      });
  }

  buscar(id: string) {
    if(id.length == 0) {
      return this.getCategories();
    }else{
      this.categoryService.getCategoryById(id)
      .subscribe({
        next: (data) => this.processCategoriesResponse(data)
      });
    }

  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
