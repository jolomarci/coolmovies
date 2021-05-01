import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
})
export class MovieComponent {
  public movies: Movie[];
  public moviesFromApi: Observable<Movie[]>;
  public currentPage: number = 0;
  maxPages: number = 0;

  constructor(private movieServcie: MovieService) {}
  ngOnInit() {
    this.getPopularMovies();
  }

  getPopularMovies() {
    this.moviesFromApi = this.movieServcie.getPopularMovies();
  }

  getPoster(imageId: string): string {
    let pic = this.movieServcie.getMoviePosterLink(imageId, 'w500');
    console.log('pic: ' + pic);
    return pic;
  }
}
