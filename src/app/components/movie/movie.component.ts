import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  public movies: Observable<Movie[]>;
  public maxPage: number = 0;
  public loaded: boolean = false;

  public currentPage: number = 1;
  public currentSortBy: string = 'popular';
  public currentGenre: string;

  @Input('searchText') searchText: string;
  public searchState: boolean = false;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    public router: Router,
    public utils: UtilService
  ) {}

  ngOnInit(): void {
    this.loaded = false;
    this.currentGenre = this.route.snapshot.queryParams['genre'];
    this.route.params.subscribe((params) => {
      this.currentPage = this.utils.checkPageParam(+params['page']);
      console.log(this.currentPage, this.currentSortBy, this.currentGenre);
      if (this.currentGenre !== undefined) this.getMoviesByGenre();
      else if (this.searchText !== undefined) {
        console.log(this.searchText);
        this.searchState = true;
        this.searchMovies();
      } else this.getMovies();
    });
  }
  searchMovies() {
    this.movieService.searchMovies(this.currentPage, this.searchText).subscribe(
      (data) => (this.movies = of(data.results)),
      (e) => {},
      () => {
        this.loaded = true;
      }
    );
  }

  public getMovies() {
    this.movieService.getMovies(this.currentPage, this.currentSortBy).subscribe(
      (data) => {
        this.movies = of(data.results);
        this.maxPage = data.total_pages;
      },
      (e) => {},
      () => {
        this.loaded = true;
      }
    );
  }

  getMoviesByGenre() {
    this.movieService
      .getMoviesByGenre(this.currentPage, this.currentGenre)
      .subscribe(
        (data) => {
          this.movies = of(data.results);
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
    this.router.navigate(['/movies/1']);
    this.ngOnInit();
  }
}
