import { ApiModuleService } from './../../services/api-module.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-module-dialog',
  templateUrl: './module-dialog.component.html',
  styleUrls: ['./module-dialog.component.scss']
})
export class ModuleDialogComponent implements OnInit {

  freshnessList =["Brand New","Second Hand", "Refurbiched"];
  productForm !: FormGroup;
  actionBtn: string = "Save";

  constructor(private formBuilder : FormBuilder, private api : ApiModuleService
    , @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef: MatDialogRef<ModuleDialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category:['', Validators.required],
      freshness:['', Validators.required],
      price:['', Validators.required],
      comment:['', Validators.required],
      date:['', Validators.required]
    });
    //console.log(this.editData);
    //for edit
    if(this.editData){
      this,this.actionBtn = "update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }

  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value)
        .subscribe({
          next:(res)=>{
            alert("product added successfully");
            this.productForm.reset();
            //when clock in save buttin in dialog data inputed in db.json and dialog get closed
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error while adding the product");
          }
        })
      }
    }else{
      this.updateProduct();
    }
  }

  updateProduct(){
    this.api.putProduct(this.productForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product update Succesfully");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert('Error while wupating the record');
      }
    })
  }
  

}
