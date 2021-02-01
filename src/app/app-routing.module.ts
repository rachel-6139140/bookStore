import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/login/auth.guards';
import { BooksListComponent } from '../app/books-list/books-list.component';
import { PurchaseComponent } from '../app/purchase/purchase.component'
import { SearchResultsComponent } from '../app/search-results/search-results.component'

import { CommonModule } from "@angular/common";
import { AdminAddBookComponent } from './admin-add-book/admin-add-book.component';

const routes: Routes = [
    // {path:"/auth/signup",loadChildren:"auth/auth.module#AuthModule"},
    { path: '', component: BooksListComponent,
    canActivate: [AuthGuard],
    },
  { path: 'books', component: BooksListComponent,
  canActivate: [AuthGuard],
  },
  { path: 'books/addBook/:bookId', component: AdminAddBookComponent,
  canActivate: [AuthGuard],
  },
  { path: 'books/myPurchaseBook', component: PurchaseComponent,
  canActivate: [AuthGuard],
  },
  { path: 'books/searchResults/:value', component :SearchResultsComponent ,
  canActivate: [AuthGuard],
  },
  { path: "auth", loadChildren: () => import('./login/auth.module').then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes) ,CommonModule],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

