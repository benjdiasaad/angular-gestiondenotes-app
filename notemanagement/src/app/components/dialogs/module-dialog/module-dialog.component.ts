import { ApiModuleService } from './../../../services/api-module.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-module-dialog',
  templateUrl: './module-dialog.component.html',
  styleUrls: ['./module-dialog.component.scss']
})
export class ModuleDialogComponent implements OnInit {

  moduleForm !: FormGroup;
  actionBtn: string = "Save";

  constructor(private formBuilder : FormBuilder, private api : ApiModuleService
    , @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef: MatDialogRef<ModuleDialogComponent>) { }

  ngOnInit(): void {
    this.moduleForm = this.formBuilder.group({
      nomModule: ['', Validators.required]
    });

    //console.log(this.editData);
    //for edit
    if(this.editData){
      this,this.actionBtn = "update";
      this.moduleForm.controls['nomModule'].setValue(this.editData.nomModule);
    }
  }

  addProduct(){
    if(!this.editData){
      if(this.moduleForm.valid){
        this.api.postModule(this.moduleForm.value)
        .subscribe({
          next:(res)=>{
            alert("Module Ajouter Avec succes");
            this.moduleForm.reset();
            //when clock in save buttin in dialog data inputed in db.json and dialog get closed
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error dont ajouter la module");
          }
        })
      }
    }else{
      this.ModifierModule();
    }
  }

  ModifierModule(){
    this.api.putModule(this.moduleForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Module modifier avec succes");
        this.moduleForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert('Error dont Modifier la module');
      }
    })
  }
  

}
