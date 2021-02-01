import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BookService } from '../books-list/books-list.service';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAdmin = false;
  purchaseBookCounter = 0;
  constructor(public authService: AuthService, private bookService : BookService ) { }
  searchBook = new FormGroup({});

  ngOnInit(): void {
    this.isAdmin = this.authService.getIsAdmin();
    this.searchBook.addControl("search",new FormControl(null, []));
  }
  onLogout(){
      this.authService.logOut();
  }
  search(){
    var value = this.searchBook.value.search;
    if(value)
      this.bookService.search(value);
      this.searchBook.controls["search"].setValue(null);
  }

}
