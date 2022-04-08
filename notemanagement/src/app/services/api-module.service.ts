import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiModuleService {

  constructor(private http: HttpClient) { }

  postModule(data: any){
    return this.http.post<any>("http://localhost:3000/moduleList", data);
  }

  getModule(){
    return this.http.get<any>("http://localhost:3000/moduleList");
  }

  putModule(data: any, id: number){
    return this.http.put<any>("http://localhost:3000/moduleList/"+id, data);
  }

  deleteProduct(id: number){
    return this.http.delete<any>("http://localhost:3000/moduleList/"+id);
  }
}
