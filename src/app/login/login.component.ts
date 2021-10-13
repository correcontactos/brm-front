import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit 
{
  angForm: FormGroup;
  constructor(private fb: FormBuilder,private dataService: ApiService,private router:Router) 
  {
    this.angForm = this.fb.group({
      user: ['', [Validators.required,Validators.minLength(1)]],
      pass: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  postdata(angForm: any)
  {
    this.dataService.login(angForm.value.user,angForm.value.pass)
    .pipe(first())
    .subscribe(
    data => {
      const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/dashboard';
      this.router.navigate([redirect]);
    },
    error => {
      alert('Credenciales no encontradas');
    });
  }

  get user() { return this.angForm.get('user'); }

  get pass() { return this.angForm.get('pass'); }

}