import {
  Component,
  ChangeDetectorRef,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent {
  public movies: Observable<Movie[]>;
  public maxPage: number = 0;
  public loaded: boolean = false;

  public currentPage: number = 1;
  public currentSortBy: string = 'popularity';
  public currentGenre: string = '';

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.loaded = false;
    this.currentSortBy = this.route.snapshot.queryParams.type;
    console.log(this.currentSortBy);
    this.currentGenre = this.route.snapshot.queryParams.genre;
    this.route.queryParams.subscribe((params) => {
      this.currentPage = this.checkParam(+params.page);
      this.currentGenre = params.genre !== undefined ? params.genre : 'all';
      this.currentSortBy =
        params.sortBy !== undefined ? params.sortBy : 'popularity';
      console.log(this.currentPage, this.currentGenre, this.currentSortBy);
      this.getMovies(this.currentPage, this.currentGenre, this.currentSortBy);
    });
  }

  checkParam(param: number): number {
    if (isNaN(param)) return 1;
    if (param < 0) return 1;
    //TODO if (param > this.maxPage) return false;
    else return param;
  }

  getMovies(pageNumber: number, genre: string, sortBy: string) {
    this.movieService.getMovies(pageNumber, genre, sortBy).subscribe(
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

  getPoster(imageId: string): string {
    if (imageId == null) return 'assets/placeholder.png';
    let imageLink = this.movieService.getMoviePosterLink(imageId, 'w500');
    return imageLink;
  }
}
