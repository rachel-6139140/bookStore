import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookService } from '../books-list/books-list.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchResult:any =[];
  searchResultSub: Subscription = new Subscription;
  value!: string;
  constructor(public router: Router ,private route: ActivatedRoute,private bookService : BookService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if(params['value'])
          this.value = params['value'];
      }
    );
    if(this.value)
      this.searchResultSub = this.bookService.getSearchResult(this.value).subscribe(result => {
        this.searchResult = result;
      });
  }

}
