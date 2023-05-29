import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppCookieService } from 'src/app/service/app-cookie.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  RegisterFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

ngOnInit(): void {
}

constructor(
  private userService : UserService,
  private router: Router 
) { }


onSubmit(): void {
  if (this.RegisterFormGroup.invalid) {
    return;
  }
  let name = this.RegisterFormGroup.controls.name.value;
  let email = this.RegisterFormGroup.controls.email.value;
  let pass = this.RegisterFormGroup.controls.password.value;
  this.userService.register(email,pass,name).subscribe(
    {
     
      next: response => {
        console.log(response),
        this.router.navigate(['/login']);
      },
      error: error =>alert(error.error.error)
    }
  )

}

}
