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
  public currentType: string = 'popular';

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.loaded = false;
    this.route.params.subscribe((params) => {
      if (this.checkParam(+params['page'])) this.currentPage = +params['page'];
      this.getMovies(this.currentPage, this.currentType);
    });
  }

  checkParam(param: number): boolean {
    if (isNaN(param)) return false;
    if (param < 0) return false;
    //TODO if (param > this.maxPage) return false;
    else return true;
  }

  getMovies(pageNumber: number = 1, type: string = 'popular') {
    this.movieService.getMovies(pageNumber, type).subscribe(
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
    let pic = this.movieService.getMoviePosterLink(imageId, 'w500');
    return pic;
  }

  setType(type: string) {
    this.currentType = type;
    this.getMovies(this.currentPage, this.currentType);
  }
}
