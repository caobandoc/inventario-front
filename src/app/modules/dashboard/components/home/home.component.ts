import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ProductElement } from 'src/app/models/product-element.model';
import { ProductService } from 'src/app/modules/shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  chartBar: any;
  chartDoughnut: any;

  constructor(
    private productService: ProductService,
  ) { }
  ngOnInit(): void {
    this.getProducts();
  }

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
    const nameProduct: string[] = [];
    const account: number[] = [];

    if (resp.metadata[0].code == "00") {

      let listProduct = resp.productResponse.products;

      listProduct.forEach((element: ProductElement) => {
        nameProduct.push(element.name);
        account.push(element.account);
      });

      //grafico de barras
      this.chartBar = new Chart('canvas-bar', {
        type: 'bar',
        data: {
          labels: nameProduct,
          datasets: [
            {
              label: 'Productos',
              data: account,
            }
          ]
        }
      });

      //grafico de dona
      this.chartDoughnut = new Chart('canvas-doughnut', {
        type: 'doughnut',
        data: {
          labels: nameProduct,
          datasets: [
            {
              label: 'Productos',
              data: account,
            }
          ]
        }
      });
    }
  }

}
