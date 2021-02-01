import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
  private isAdmin = false;
  private email!: string;
  private id!: string;
  BACKEND_URL_USERS = "http://localhost:4000/api/users/"
  constructor(private http: HttpClient, private router: Router) {}


  getIsAdmin(){
    return this.isAdmin;
  }
  getIsAuth(){
    this.http.get<any>(
       this.BACKEND_URL_USERS + "currentuser" ,{withCredentials: true })
      .subscribe((response) => {
        if(response.currentUser){
          this.isAuthenticated = true;
          this.isAdmin = response.currentUser.admin;
        }
        else {
          this.isAuthenticated = false;
          this.isAdmin = false;
        }
         });
        return this.isAuthenticated;
}
  login(email: string, password: string) {
    const authData = {email: email, password: password };
    this.http.post<any>(
      this.BACKEND_URL_USERS + "signin",
      authData ,{withCredentials: true }
       )
      .subscribe(response => {
        this.isAdmin = response.admin;
        this.email = response.email;
        this.id = response.id;
        this.saveAuthData(this.email , password , this.id , this.isAdmin);
        this.router.navigate(['/books']);
        this.isAuthenticated = true;

      }, error => {
        this.isAuthenticated = false;
        alert(error.error.errors[0].message);

      }
    );

  }

  signup(email: string, password: string) {
        const authData = {email: email, password: password };
        this.http.post<any>(
          this.BACKEND_URL_USERS + "signup",
          authData, {withCredentials: true }
           )
          .subscribe(response => {
            this.isAdmin = response.admin;
            this.email = response.email;
            this.id = response.id;
            this.saveAuthData(this.email , password , this.id , this.isAdmin);
            this.router.navigate(['/books']);
            this.isAuthenticated = true;

          }, error => {
            this.isAuthenticated = false;
            alert(error.error.errors[0].message);
          }
        );
  }
  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation.email){
      return;
  }
    this.isAuthenticated = true;
    this.isAdmin = authInformation.admin === "true";
  }
  private getAuthData(){
    const id = sessionStorage.getItem("id");
    const admin = sessionStorage.getItem("admin");
    const email = sessionStorage.getItem("email");
    return {
        id: id,
        email: email,
        admin:admin
    }
}
  private saveAuthData(email: string, password: string, id: string,admin:boolean) {
   sessionStorage.setItem('id', id);
   sessionStorage.setItem('email', email);
   sessionStorage.setItem('admin', admin.toString());

}
private clearAuthData(){
  sessionStorage.removeItem('id');
  sessionStorage.removeItem('email');
  sessionStorage.removeItem('admin');
}

logOut(){
  this.http.post<any>(this.BACKEND_URL_USERS+'signout',{withCredentials: true })
 .subscribe(response => {
   this.isAuthenticated = false;
   this.clearAuthData();
   this.router.navigate(['/auth/login'])

 }
);

}
}