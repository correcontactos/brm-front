import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Privilege } from '../privileges';

@Component({
  selector: 'app-privilegesedit',
  templateUrl: './privileges.edit.component.html',
  styleUrls: ['./privileges.component.css']
})
export class PrivilegesEditComponent implements OnInit {

  selectedName:string = '';
  selectedOption:string = 'partial';
  selectedId:number = 0;

  options = [
    {name:'Parcial', value:'partial'},
    {name:'Total', value:'total'}
  ]
      
  
  angForm: FormGroup;
  constructor(private fb: FormBuilder,private dataService: ApiService, private activatedRoute: ActivatedRoute) 
  {
    this.angForm = this.fb.group({
      name: ['', [Validators.required,Validators.minLength(1)]],
      access: ['', Validators.required]
    });
  }

  
  ngOnInit(): void {
    this.selectedId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.dataService.getPrivilege(this.selectedId).subscribe((res:any) => {
      this.selectedName = res.name;
      this.selectedOption = res.access;
    });
    
  }

  postdata(angForm: any)
  {
    this.dataService.editPrivilege(this.selectedId, angForm);
  }

  get name() { return this.angForm.get('name'); }

  get access() { return this.angForm.get('access'); }

}
