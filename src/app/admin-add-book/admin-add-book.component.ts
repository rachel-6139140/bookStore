import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { BookService } from '../books-list/books-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-add-book',
  templateUrl: './admin-add-book.component.html',
  styleUrls: ['./admin-add-book.component.css']
})
export class AdminAddBookComponent implements OnInit {
  bookForm = new FormGroup({});
  idBook!: string;
  bookSub: Subscription = new Subscription;
  books:any;

  constructor(public router: Router ,private route: ActivatedRoute,public bookService: BookService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if(params['bookId'])
          this.idBook = params['bookId'];
      }
    );
    if(this.idBook!='new'){
      this.bookSub = this.bookService.getbooks()
      .subscribe((response) => {
        this.books = response;
        this.setForm();
      });
     }
    this.bookForm.addControl("book",new FormControl(null, []));
    this.bookForm.addControl("author",new FormControl(null, []));
    this.bookForm.addControl("publisher",new FormControl(null, []));
    this.bookForm.addControl("price",new FormControl(null, []));
    this.bookForm.addControl("cover",new FormControl(null, []));



  }
  setForm(){
    if(this.books){
      this.books = this.books.find((b: { id: string; }) => b.id == this.idBook);
      this.bookForm.controls['book'].setValue(this.books['book']);
      this.bookForm.controls['author'].setValue(this.books['author']);
      this.bookForm.controls['cover'].setValue(this.books['cover']);
      this.bookForm.controls['price'].setValue(this.books['price']);
      this.bookForm.controls['publisher'].setValue(this.books['publisher']);
    }
  }
  submit(){
    if(this.bookForm.invalid){
      alert("there are fields mandatory");
      return;
    }
    if(this.idBook=='new')
      this.bookService.addBook(this.bookForm);
    else
    this.bookService.updateBook(this.bookForm , this.books.id);
  }

}
