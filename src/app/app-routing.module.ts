import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ChatComponent } from './component/chat/chat.component';
import { AuthGuardService } from './service/auth-guard.service';
import { ActivateAccountComponent } from './component/activate-account/activate-account.component';

const routes: Routes = [

  
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  }, 
  {
    path: 'login',
    component: LoginComponent
  }, 
  {
    path: 'register',
    component: RegisterComponent
    
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'activate/:token',
    component: ActivateAccountComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
