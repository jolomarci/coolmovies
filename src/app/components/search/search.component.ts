import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  public searchText: string;
  public contentType: string = 'Movies';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.searchText = queryParams['keyword'];
      console.log(
        'searchText',
        this.searchText,
        'contentType',
        this.contentType
      );
    });
  }
}
