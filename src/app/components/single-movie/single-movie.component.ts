import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SingleMovie } from 'src/app/models/single-movie';
import { MovieService } from 'src/app/services/movie.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.css'],
})
export class SingleMovieComponent implements OnInit {
  public movie: SingleMovie;
  public loaded: boolean = false;
  public favourite: boolean = false;
  public type: string = 'movie';
  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    public utils: UtilService
  ) {}

  ngOnInit(): void {
    this.loaded = false;
    let id: number;
    id = +this.route.snapshot.params['id'];
    this.movieService.getMovieById(id).subscribe(
      (movie) => {
        this.movie = movie;
        this.setFavourite();
      },
      (error) => {
        this.movieService.handleError(error);
      },
      () => (this.loaded = true)
    );
  }

  setFavourite() {
    let movies: SingleMovie[] = JSON.parse(localStorage.getItem('movies'));
    if (movies !== null) {
      movies.forEach((movie) => {
        if (movie.id == this.movie.id) this.favourite = true;
      });
    }
  }

  addFavourite(movie) {
    this.movieService.saveMovie(movie);
    this.setFavourite();
  }
}
