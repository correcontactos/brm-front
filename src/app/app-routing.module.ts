import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrivilegesComponent } from './privileges/privileges.component';
import { PrivilegesEditComponent } from './privileges/privileges.edit.component';
import { UsersComponent } from './users/users.component';
import { UsersEditComponent } from './users/users.edit.component';
import { AuthguardGuard } from './authguard.guard';

const routes: Routes = [
{ path: '', component: LoginComponent },
{ path: 'login', component: LoginComponent },
{ path: 'home', component: HomeComponent },
{ path: 'dashboard', component: DashboardComponent,canActivate: [AuthguardGuard] },
{ path: 'privileges', component: PrivilegesComponent },
{ path: 'editPrivilege/:id', component: PrivilegesEditComponent },
{ path: 'users', component: UsersComponent },
{ path: 'editUser/:id', component: UsersEditComponent },
]

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})

export class AppRoutingModule { }