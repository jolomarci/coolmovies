import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
})
export class MovieComponent {
  public movies: Movie[];
  public moviesFromApi: Observable<Movie[]>;
  public currentPage: number = 0;
  maxPages: number = 0;

  constructor(private movieServcie: MovieService) {}
  ngOnInit() {
    this.movieServcie.getPopularMovies().subscribe((mov) => {
      this.movies = mov;
    });
  }

  getPopularMovies() {
    this.moviesFromApi = this.movieServcie.getPopularMovies();
  }
}
