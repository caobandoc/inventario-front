import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService
    ) { }

  onNoClick(){
    this.dialogRef.close(0);
  }

  delete(){
    if(this.data.id){
      this.categoryService.deleteCategory(this.data.id)
        .subscribe({
          next: () => this.dialogRef.close(1),
          error: () => this.dialogRef.close(2)
        });
    }else{
      this.dialogRef.close(2);
    }
  }

}
