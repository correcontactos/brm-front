import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})

export class AppComponent 
{
  loginbtn:boolean;
  logoutbtn:boolean;
  user:string = '';
  access:string = '';

  constructor(private dataService: ApiService) 
  {
    dataService.getLoggedInName.subscribe(name => this.changeName(name));
    if(this.dataService.isLoggedIn())
    {
      console.log("loggedin");
      this.loginbtn=false;
      this.logoutbtn=true;
      this.user = String(this.dataService.getToken());
      this.access = String(this.dataService.getAccess());
      if ( this.access == 'partial' )
        this.access = 'parcial';

      this.user = 'Usuario: '+this.user;
      this.access = 'Acceso: '+this.access;
    }
    else{
      this.loginbtn=true;
      this.logoutbtn=false
    }
  }

  private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.loginbtn = !name;
  }

  logout()
  {
    this.dataService.deleteToken();
    this.dataService.deleteAccess();
    window.location.href = '/login';
  }
}