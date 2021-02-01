import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookService } from '../books-list/books-list.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  myPurchaseBook:any;
  myPurchaseBookSub: Subscription = new Subscription;
  constructor(private bookService : BookService) { }

  ngOnInit(): void {
    this.myPurchaseBookSub = this.bookService.getMyPurchaseBook()
    .subscribe((response) => {
      this.myPurchaseBook = response;
    });
  }

}
