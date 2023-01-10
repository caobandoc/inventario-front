import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ProductElement } from 'src/app/models/product-element.model';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { ProductService } from '../../shared/services/product.service';
import { UtilService } from '../../shared/services/util.service';
import { NewProductComponent } from '../new-product/new-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  isAdmin: any;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.isAdmin = this.utilService.isAdmin();
  }

  displayedColumns: string[] = ['id', 'name', 'price', 'account', 'category', 'picture', 'actions'];
  dataSource = new MatTableDataSource<ProductElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getProducts() {
    this.productService.getProducts()
      .subscribe({
        next: resp => {
          console.log("respuesta de productos: ", resp);
          this.processProductResponse(resp);
        },
        error: error => console.log("error en productos: ", error)
      });
  }

  processProductResponse(resp: any) {
    const dataProduct: ProductElement[] = [];
    if (resp.metadata[0].code == "00") {

      let listProduct = resp.productResponse.products;

      listProduct.forEach((element: ProductElement) => {
        //element.category = element.category.name;
        element.picture = 'data:image/jpeg;base64,' + element.picture;
        dataProduct.push(element);
      });

      this.dataSource = new MatTableDataSource<ProductElement>(dataProduct);
      this.dataSource.paginator = this.paginator;
    }
  }

  openProductDialog() {
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result == 1) {
          this.openSnackBar("Producto agregada", "Exitosa");
          this.getProducts();
        } else if (result == 2) {
          this.openSnackBar("Error al crear la producto", "Error");
        }
      });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  edit(element: any) {
    const dialogRef = this.dialog.open(NewProductComponent , {
      width: '500px',
      data: {
        id: element.id,
        name: element.name,
        price: element.price,
        account: element.account,
        category: element.category,
        picture: element.picture
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result == 1) {
          this.openSnackBar("Producto actualizada", "Exitosa");
          this.getProducts();
        } else if (result == 2) {
          this.openSnackBar("Error al actualizar la producto", "Error");
        }
      });
  }

  delete(id: string) {
    const dialogRef = this.dialog.open(ConfirmComponent , {
      //width: '500px',
      data: {
        id: id, 
        module: "product"
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result == 1) {
          this.openSnackBar("Producto eliminada", "Exitosa");
          this.getProducts();
        } else if (result == 2) {
          this.openSnackBar("Error al eliminar el producto", "Error");
        }
      });
  }

  buscar(termino: string) {
    if (termino.length == 0) {
      this.getProducts();
      return;
    }

    this.productService.searchProduct(termino)
      .subscribe({
        next: resp => {
          console.log("respuesta de productos: ", resp);
          this.processProductResponse(resp);
        },
        error: error => console.log("error en productos: ", error)
      });
  }

}
