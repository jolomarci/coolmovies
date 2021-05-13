import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public searchText: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('search', this.searchText);
  }

  searchRedirect(uri: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() =>
        this.router.navigate(['/search'], {
          queryParams: { keyword: this.searchText },
        })
      );
  }
}
