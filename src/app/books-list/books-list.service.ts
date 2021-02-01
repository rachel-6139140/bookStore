import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import {  Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
    BACKEND_URL = 'http://localhost:4000/api/books/';
    books:any;
    searchResult = [];
    searchResultSub = new Subject<any>();
    booksSub = new Subject<any>();
    myPurchaseBook:any;
    myPurchaseBookSub = new Subject<any>();
    constructor(private http: HttpClient,private router: Router) {}

   getbooks(){
      this.http.get<any>(
       this.BACKEND_URL,{withCredentials: true })
      .subscribe((response) => {
            this.books = response;
            this.booksSub.next(this.books);
        });
        return this.booksSub.asObservable();
       }
    addPurchaseBook(bookId:any){
      const field = {bookId: bookId};
      this.http.post<any>(
        `${this.BACKEND_URL}purchase`, field, {withCredentials: true })
        .subscribe(() => {
        }, error => {
            alert(error.error.errors[0].message);
          });
    }
    deleteBook(bookId:any){
        const field = {bookId: bookId};
        this.http.delete<any>(
            `${this.BACKEND_URL}${bookId}`, {withCredentials: true})
            .subscribe(() => {
            }, error => {
                alert(error.error.errors[0].message);
              });
    }
    getMyPurchaseBook(){
        this.http.get<any>(
            `${this.BACKEND_URL}purchase`, {withCredentials: true })
            .subscribe((response) => {
                this.myPurchaseBook = response;
                this.myPurchaseBookSub.next(this.myPurchaseBook);
        });
        return this.myPurchaseBookSub.asObservable();

    }
    addBook(form:any){
        this.http.post<any>(
            `${this.BACKEND_URL}create`,form.value, {withCredentials: true })
            .subscribe(() => {
                this.router.navigate(['/books']);
            }, error => {
                alert(error.error.errors[0].message);
                });
     }
     updateBook(form:any , id:string){
        const { book, author, publisher } = form.value;
        const value = {
            id : id ,
            book : book ,
            author : author ,
            publisher : publisher
        }
        this.http.patch<any>(
            this.BACKEND_URL, value, {withCredentials: true })
            .subscribe(() => {
                this.router.navigate(['/books']);
            });
     }
     search(value:string){
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/books/searchResults', value])
        });
     }
     getSearchResult(value:string){
        this.http.get<any>(
            `${this.BACKEND_URL}${value}`, {withCredentials: true })
            .subscribe((response) => {
                this.searchResult = response;
                this.searchResultSub.next(this.searchResult);
            });
        return this.searchResultSub.asObservable();
        }
}
