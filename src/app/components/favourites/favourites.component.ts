import { Component, OnInit } from '@angular/core';
import { SingleMovie } from 'src/app/models/single-movie';
import { SingleSerie } from 'src/app/models/single-serie';
import { MovieService } from 'src/app/services/movie.service';
import { SerieService } from 'src/app/services/serie.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit {
  public movies: SingleMovie[];
  public series: SingleSerie[];
  public moviesLoaded: boolean = false;
  constructor(
    private movieService: MovieService,
    private serieService: SerieService,
    public utils: UtilService
  ) {}

  ngOnInit(): void {
    this.movies = this.movieService.loadMovies();
    this.moviesLoaded = true;
    this.series = this.serieService.loadSeries();
    console.log(this.movies[0].title);
  }
}
