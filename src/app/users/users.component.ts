import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { User } from '../users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  results:any;
  result:any;
  selectedUser:string = '';
  selectedPass:string = '';
  selectedOption:number = 3;

  options = [
    {name:'Seleccione...', id:0, value:0}
  ]
      
  angForm: FormGroup;

  constructor(private fb: FormBuilder,private dataService: ApiService) 
  {
    this.angForm = this.fb.group({
      user: ['', [Validators.required,Validators.minLength(1)]],
      pass: ['', Validators.required],
      privilege: ['', Validators.required]
    });
  }

  ngOnInit(): void 
  {
    this.results = this.dataService.getUsers();
    this.options = this.dataService.getPrivileges();
  }

  delete(id: number){
    this.dataService.deleteUser(id);
  }

  postdata(angForm: any)
  {
    this.dataService.createUser(this.selectedUser, this.selectedPass, this.selectedOption);
  }

  get name() { return this.angForm.get('name'); }

  get access() { return this.angForm.get('access'); }

}
