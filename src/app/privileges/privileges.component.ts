import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Privilege } from '../privileges';

@Component({
  selector: 'app-privileges',
  templateUrl: './privileges.component.html',
  styleUrls: ['./privileges.component.css']
})
export class PrivilegesComponent implements OnInit {

  results:any;
  result:any;
  selectedName:string = '';
  selectedOption:string = 'partial';

  options = [
    {name:'Parcial', value:'partial'},
    {name:'Total', value:'total'}
  ]
      
  
  angForm: FormGroup;
  constructor(private fb: FormBuilder,private dataService: ApiService) 
  {
    this.angForm = this.fb.group({
      name: ['', [Validators.required,Validators.minLength(1)]],
      access: ['', Validators.required]
    });
  }

  
  ngOnInit(): void 
  {
    this.results = this.dataService.getPrivileges();
  }

  delete(id: number)
  {
    this.dataService.deletePrivilege(id);
  }

  postdata(angForm: any)
  {
    this.dataService.createPrivilege(this.selectedName, this.selectedOption);
  }

  get name() { return this.angForm.get('name'); }

  get access() { return this.angForm.get('access'); }

}
