import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UtilService } from '../../services/util.service';
import { Serie } from '../../models/serie';
import { SerieService } from '../../services/serie.service';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css'],
})
export class SerieComponent implements OnInit {
  public series: Observable<Serie[]>;
  public loaded: boolean = false;

  public currentPage: number = 1;
  public currentSortBy: string = 'popular';
  public currentGenre: string;

  @Input('searchText') searchText: string;
  public searchState: boolean = false;

  constructor(
    private serieService: SerieService,
    private route: ActivatedRoute,
    public router: Router,
    private utils: UtilService
  ) {}

  ngOnInit(): void {
    this.loaded = false;
    this.currentGenre = this.route.snapshot.queryParams['genre'];
    this.route.params.subscribe((params) => {
      this.currentPage = this.utils.checkPageParam(+params['page']);
      console.log(this.currentPage, this.currentSortBy, this.currentGenre);
      if (this.currentGenre !== undefined) this.getSeriesByGenre();
      else if (this.searchText !== undefined) {
        console.log(this.searchText);
        this.searchState = true;
        this.searchSeries();
      } else this.getSeries();
    });
  }

  searchSeries() {
    this.serieService.searchSeries(this.currentPage, this.searchText).subscribe(
      (data) => {
        this.series = of(data.results);
      },
      (e) => {},
      () => {
        this.loaded = true;
      }
    );
  }

  getSeries() {
    this.serieService.getSeries(this.currentPage, this.currentSortBy).subscribe(
      (data) => {
        this.series = of(data.results);
      },
      (e) => {},
      () => {
        this.loaded = true;
      }
    );
  }

  getSeriesByGenre() {
    this.serieService
      .getSeriesByGenre(this.currentPage, this.currentGenre)
      .subscribe(
        (data) => {
          this.series = of(data.results);
        },
        (e) => {},
        () => {
          this.loaded = true;
        }
      );
  }

  public setSortBy(value: string) {
    console.log(value);
    this.currentSortBy = value;
    this.router.navigate(['/series/1']);
    this.ngOnInit();
  }
}
