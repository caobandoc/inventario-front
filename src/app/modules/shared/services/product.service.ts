import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
  ) { }

  getProducts() {
    return this.http.get(`${base_url}/products`);
  }

  saveProduct(body: any) {
    return this.http.post(`${base_url}/products`, body);
  }

  updateProduct(body: any, id: string) {
    return this.http.put(`${base_url}/products/${id}`, body);
  }
}
