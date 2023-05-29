import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit{

  private token:any;
  isActivated = false;
  isTokenExpire = false;
  isAccountAlreadyActivated = false;
  constructor(
   
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
    ){} //inject ActivatedRoute class
  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.paramMap.get('token'); //get 'token' parameter form path 'activate/:token'
    if(this.token === null){
      this.router.navigate(['/login']);
    }
    
    this.activateAccount();
    throw new Error('Method not implemented.');
  }

  private activateAccount(){
    this.userService.activate(this.token as string).subscribe(
      {
        next: response => {
          this.isActivated = true,
          console.log('activation success'),
          this.router.navigate(['/login']);
        },
        error: error =>{
  
          let errorcode = error.error.error;
          alert(errorcode)
          if(errorcode === 'activation.token.expired'){
            this.isTokenExpire = true;
          }else if(errorcode === 'user.activation.already')
            this.isAccountAlreadyActivated = true;
  
        }
      }
    )
  }

  resendActivationEmail(){
    this.userService.reactivate(this.token as string).subscribe({
      next: (response) => {
        //success
      },
      error: error => {
        console.log(error);
      }
    }
    )
  }

  naviagateToLogin(){
    this.router.navigate(['/login']);
  }
}
