import { ModuleDialogComponent } from './../dialogs/module-dialog/module-dialog.component';
import { ApiModuleService } from './../../services/api-module.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {

  title = 'angular-material-ui';
  displayedColumns: string[] = ['nomModule', 'Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api : ApiModuleService) {}
  
  ngOnInit(): void {
    this.getAllModule();
  }


  openDialog() {
    this.dialog.open(ModuleDialogComponent, {
     width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val == 'save'){
        this.getAllModule();
      }
    })
  }

  getAllModule(){
    this.api.getModule()
    .subscribe({
      next:(res)=>{
        this.dataSource= new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      },
      error:()=>{
        alert("Error while fetching the Records!!");
      }
    })
  }

  //this is just call our module dialog and change the value of the button to update
  modifierModule(row: any){
    this.dialog.open(ModuleDialogComponent, {
      width:'30%',
      data:row
    }).afterClosed().subscribe((val: any)=>{
      if(val == 'update'){
        this.getAllModule();
      }
    })
  }

  supprimerModule(id:number){
    this.api.supprimerModule(id)
    .subscribe({
      next:(res)=>{
        alert("Module supprimer avec succes");
        this.getAllModule();
      },
      error:()=>{
        alert("Error de supprission");
      }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }





}
