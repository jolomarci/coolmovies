import { Component, OnInit } from '@angular/core';
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
      console.log(this.currentGenre !== undefined);
      if (this.currentGenre !== undefined) this.getSeriesWithGenre();
      else this.getSeries();
    });
  }

  getSeries() {
    console.log('szia');
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

  getSeriesWithGenre() {
    console.log('halo');
    this.serieService
      .getSeriesWithGenre(this.currentPage, this.currentGenre)
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
