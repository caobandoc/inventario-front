import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from '../category/components/category/category.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    {
        path: '', 
        component: HomeComponent,
    },
    {
        path: 'home', 
        component: HomeComponent,
    },
    {
        path: 'category',
        component: CategoryComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouterChildModule { }
