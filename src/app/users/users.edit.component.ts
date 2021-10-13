import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../users';

@Component({
  selector: 'app-usersedit',
  templateUrl: './users.edit.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersEditComponent implements OnInit {

  selectedUser:string = '';
  selectedOption:number = 3;
  selectedId:number = 0;

  options = [
    {name:'Seleccione...', id:0, value:0}
  ]
      
  
  angForm: FormGroup;
  constructor(private fb: FormBuilder,private dataService: ApiService, private activatedRoute: ActivatedRoute) 
  {
    this.angForm = this.fb.group({
      user: ['', [Validators.required,Validators.minLength(1)]],
      pass: ['', [Validators.required,Validators.minLength(1)]],
      privilege: ['', Validators.required]
    });
  }

  
  ngOnInit(): void {
    this.selectedId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.dataService.getUser(this.selectedId).subscribe((res:any) => {
      this.selectedUser = res.user;
      this.selectedOption = res.privilege_id;
    });
    this.options = this.dataService.getPrivileges();
  }

  postdata(angForm: any)
  {
    this.dataService.editUser(this.selectedId, angForm);
  }

  get user() { return this.angForm.get('user'); }

  get privilege() { return this.angForm.get('privilege'); }

}
