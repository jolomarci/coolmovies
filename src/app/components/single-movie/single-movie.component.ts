import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SingleMovie } from 'src/app/models/single-movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.css'],
})
export class SingleMovieComponent implements OnInit {
  public movie!: SingleMovie;
  public loaded: boolean = false;
  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loaded = false;
    let id: number;
    id = +this.route.snapshot.params['id'];
    this.movieService.getMovieById(id).subscribe(
      (movie) => (this.movie = movie),
      (e) => {},
      () => (this.loaded = true)
    );
  }

  getPoster(imageId: string): string {
    let pic = this.movieService.getMoviePosterLink(imageId, 'original');
    return pic;
  }

  getIMDB(id: number): string {
    return this.movieService.getIMDBLink(id);
  }
}
