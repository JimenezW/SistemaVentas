import { Component, Inject, OnInit } from '@angular/core';
import icClose from '@iconify/icons-ic/twotone-close';
import * as configs from '../../../../static-data/configs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '@shared/services/alert.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'vex-category-manage',
  templateUrl: './category-manage.component.html',
  styleUrls: ['./category-manage.component.scss']
})
export class CategoryManageComponent implements OnInit {

  icClose = icClose;
  configs = configs;

  form : FormGroup;

 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _alert : AlertService,
    private _fb:FormBuilder,
    private _categoryService : CategoryService,
    public _dialogRef:MatDialogRef<CategoryManageComponent>) {
      this.initForm();
     }

    initForm():void{
      this.form = this._fb.group({
        categoryId:[0,[Validators.required]],
        name:['',[Validators.required]],
        description:[''],
        state:['', [Validators.required]]
      });

    }

  ngOnInit(): void {
  }

  CategorySave():void{
    if(this.form.invalid){
      //this.form.markAllAsTouched();
      return Object.values(this.form.controls).forEach((opt)=>{
        opt.markAllAsTouched();
      });
    }

    const id=this.form.get('categoryId').value;

    if(id > 0){
      this.CategoryEdit(id);
    }else{
      this.CategoryRegister();
    }


  }

  CategoryRegister():void{
    this._categoryService.CategoryRegister(this.form.value).subscribe((res)=>{
      if(res.isSuccess){
        this._alert.success('Excelente', res.message);
        this._dialogRef.close(true);
      }else{
        this._alert.warn('Atención', res.message);
      }
    });
  }

  CategoryEdit(CategoryId : number):void{

  }
}
