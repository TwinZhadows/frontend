import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatResponse } from '../interface/chat-response';
import { LoginResponse } from '../interface/login-response';
import { RegisterResponse } from '../interface/register-response';
import {ActivateResponse} from  '../interface/activation-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { 
    
  }
  login(email: string, password: string): Observable<LoginResponse>{
    let url = 'http://localhost:8080/test/login'; 
    let body = {
      email: email,
      password: password
    };
    return this.http.post<LoginResponse>(url, body);
  }

  register(email: string, password: string, name: string): Observable<RegisterResponse>{
    let url = 'http://localhost:8080/test/register'; 
    let body = {
      email: email,
      password: password,
      name: name
    };
    return this.http.post<RegisterResponse>(url, body);
  }

  activate(token: string): Observable<ActivateResponse>{
    let url = 'http://localhost:8080/test/activate'
    let body = {
      token: token
    };
    return this.http.post<ActivateResponse>(url, body);
  }

  reactivate(token: string): Observable<any>{
    let url = 'http://localhost:8080/test/reactivate'
    let body = {
      token: token
    };
    return this.http.post<any>(url, body);
  }


}
