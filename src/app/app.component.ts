import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  _router!: string;
  title = 'angular-bookShop';
  constructor(private authService: AuthService ,     private router: Router,
    private route: ActivatedRoute ,){
    this.router.events.subscribe(()=>{
      this._router = this.router.url;
  });
  }
  routerStartsWith(string:string){
    if(this._router)
      return this._router.includes(string);
    return false;
    }
  ngOnInit(){
    debugger;
    this.authService.autoAuthUser();
  }

}
