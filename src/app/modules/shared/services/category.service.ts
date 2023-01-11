import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getCategories(){
    const endpoint = `${base_url}/categories`;
    return this.http.get(endpoint);
  }

  saveCategory(data: any){
    const endpoint = `${base_url}/categories`;
    return this.http.post(endpoint, data);
  }

  updateCategory(data: any, id: string){
    const endpoint = `${base_url}/categories/${id}`;
    return this.http.put(endpoint, data);
  }

  deleteCategory(id: string){
    const endpoint = `${base_url}/categories/${id}`;
    return this.http.delete(endpoint);
  }

  getCategoryById(id: string){
    const endpoint = `${base_url}/categories/${id}`;
    return this.http.get(endpoint);
  }

  exportCategories(){
    const endpoint = `${base_url}/categories/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}
