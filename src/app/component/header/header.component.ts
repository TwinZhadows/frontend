import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppCookieService } from 'src/app/service/app-cookie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  constructor(
    private appCookieService: AppCookieService,
    private router: Router
  ){}

  ngOnInit(): void {
  }

  doLogOut(){
    this.appCookieService.deleteAccessToken();
    this.router.navigate(['/login']);
  }

}
