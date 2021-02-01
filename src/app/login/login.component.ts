import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from '@angular/forms';

import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  invalidSub: Subscription = new Subscription;
  constructor(public authService: AuthService) {}

  ngOnInit(){}
  onLogin(form: NgForm , type:string){
    if(form.invalid){
      return;
    }
    if(type == "signin")
      this.authService.login(form.value.email, form.value.password);
    else
      this.authService.signup(form.value.email, form.value.password);


}

}