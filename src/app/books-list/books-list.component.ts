import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookService} from './books-list.service'
import { CommonModule } from "@angular/common";
import { AuthService } from '../login/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  books:any;
  isAdmin = false;
  bookSub: Subscription = new Subscription;
  constructor(public router: Router ,private route: ActivatedRoute,private bookService : BookService , public authService: AuthService) { }

  ngOnInit() {
    this.isAdmin = this.authService.getIsAdmin();
    this.bookSub = this.bookService.getbooks()
    .subscribe((response) => {
      this.books = response;
    });

  }
  addPurchaseBook(bookId: any){
    this.bookService.addPurchaseBook(bookId);
  }
  deleteBook(bookId :any){
    this.bookService.deleteBook(bookId);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/books']);
    });
  }
  updateBook(bookId:any){
    this.router.navigate(['books/addBook' , bookId]);
  }
}
