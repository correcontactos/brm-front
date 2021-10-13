import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './users';
import { Privilege } from './privileges';

@Injectable({
providedIn: 'root'
})

export class ApiService 
{
  redirectUrl:string = '';
  baseUrl:string = "http://localhost/api";
  useraccess:string = '';
  arr:any = [];
  arrr:any = [];
  arrlist:any = [];
  priv:any;
  
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  
  constructor(private httpClient : HttpClient) { }

  public login(user: string, pass: string) 
  {
    return this.httpClient.post<any>(this.baseUrl + '/login', { user, pass })
    .pipe(map(User => 
    {
      this.setToken(User.user);
      this.setAccess(User.access);
      this.getLoggedInName.emit(true);
      window.location.href = '/dashboard';
      return User;
    }));
  }

  public getPrivileges()
  {
    this.arr = [];
    this.httpClient.get<any>(this.baseUrl + '/privileges')
    .subscribe(data => { 
      for(let key in data.data) {
        this.arr.push(data.data[key])
      }
     })
    return this.arr;
  }

  public getPrivilege(id: number) 
  {
    return this.httpClient.get<any>(this.baseUrl + '/privileges/' + id)
    .pipe(map(Privilege => 
    {
      return Privilege;
    }));   
  }

  public deletePrivilege(id : number){
    this.httpClient.put<any>(this.baseUrl + '/privileges/'+ id +'/delete/', { useraccess: this.getAccess() })
    .subscribe({
      next: data => {
        if(data.affected == 0)
          alert('Registro no eliminado')
        else{
          alert('Registro eliminado');
          window.location.reload();
        }
        return data.affected
      },
      error: error => {
        alert(error.error)
      }
    })
  }

  public editPrivilege(id:number, form : any){
    this.httpClient.put<any>(this.baseUrl + '/privileges/edit', { useraccess: this.getAccess(), id: id, name: form.value.name, access:form.value.access })
    .subscribe({
      next: data => {
        if(data.affected == 0)
          alert('Registro no editado')
        else{
          alert('Registro editado');
        }
        return data.affected
      },
      error: error => {
        alert(error.error)
      }
    })
  }

  public createPrivilege(name: string, access: string) {
    this.httpClient.post<any>(this.baseUrl + '/privileges', { useraccess: this.getAccess(), name: name, access:access })
    .subscribe({
      next: data => {
        alert("Registro creado");
        window.location.reload();
      },
      error: error => {
        alert(error.error)
      }
    })
  }

  public getUsers()
  {
    this.arrr = [];
    this.httpClient.get<any>(this.baseUrl + '/users')
    .subscribe(data => { 
      for(let key in data.data) {
        this.arrr.push(data.data[key])
      }
     })
    return this.arrr;
  }

  public getUser(id: number) 
  {
    return this.httpClient.get<any>(this.baseUrl + '/users/' + id)
    .pipe(map(User => 
    {
      console.log(User);
      return User;
    }));   
  }

  public deleteUser(id : number){
    this.httpClient.put<any>(this.baseUrl + '/users/'+ id +'/delete/', { useraccess: this.getAccess() })
    .subscribe({
      next: data => {
        if(data.affected == 0)
          alert('Registro no eliminado')
        else{
          alert('Registro eliminado');
          window.location.reload();
        }
        return data.affected
      },
      error: error => {
        alert(error.error)
      }
    })
  }

  public editUser(id:number, form : any){
    this.httpClient.put<any>(this.baseUrl + '/users/edit', { useraccess: this.getAccess(), id: id, user: form.value.user, pass:form.value.pass, privilege_id:form.value.privilege })
    .subscribe({
      next: data => {
        if(data.affected == 0)
          alert('Registro no editado')
        else{
          alert('Registro editado');
        }
        return data.affected
      },
      error: error => {
        alert(error.error)
      }
    })
  }

  public createUser(user: string, pass:string, privilege: number) {
    this.httpClient.post<any>(this.baseUrl + '/users', { useraccess: this.getAccess(), user: user, pass:pass, privilege_id :privilege })
    .subscribe({
      next: data => {
        alert("Registro creado");
        window.location.reload();
      },
      error: error => {
        //alert("Ocurrio un error, intente nuevamente")
        alert(error.error)
      }
    })
  }

  setToken(token: string) 
  {
    localStorage.setItem('token', token);
  }

  getToken() 
  {
    return localStorage.getItem('token');
  }
  
  deleteToken() {
    localStorage.removeItem('token');
  }

  setAccess(useraccess: string) {
    if (useraccess == 'partial')
      useraccess = 'parcial';

    localStorage.setItem('useraccess', useraccess);
  }
  
  getAccess() {
    return localStorage.getItem('useraccess');
  }
  
  deleteAccess() {
    localStorage.removeItem('useraccess');
  }



  isLoggedIn() {
  const usertoken = this.getToken();
  if (usertoken != null) {
  return true
  }
  return false;
  }
}