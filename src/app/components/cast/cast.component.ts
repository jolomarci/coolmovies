import { Component, Input, OnInit } from '@angular/core';
import { People } from 'src/app/models/people';
import { MovieService } from 'src/app/services/movie.service';
import { SerieService } from 'src/app/services/serie.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.css'],
})
export class CastComponent implements OnInit {
  /** 'movie' or 'serie, decides the used getter*/
  @Input('type') type: string;

  /** Content id*/
  @Input('typeId') typeId: number;

  /** Additional season id for series*/
  @Input('seasonId') seasonId: number;

  public cast: People[];
  public loaded: boolean = false;

  constructor(
    private movieService: MovieService,
    private serieService: SerieService,
    private utils: UtilService
  ) {}

  ngOnInit(): void {
    this.loaded = false;
    if (this.type === 'movie') this.getMovieCast();
    else if (this.type === 'serie') this.getSerieCast();
  }

  getSerieCast() {
    this.serieService.getSeasonCast(this.typeId, this.seasonId).subscribe(
      (data) => {
        this.cast = data.cast;
        this.cast = this.cast.slice(0, 6);
      },
      (error) => {
        this.serieService.handleError(error);
      },
      () => (this.loaded = true)
    );
  }

  getMovieCast() {
    this.movieService.getCast(this.typeId).subscribe(
      (data) => {
        this.cast = data.cast;
        this.cast = this.cast.slice(0, 6);
      },
      (error) => {
        this.movieService.handleError(error);
      },
      () => (this.loaded = true)
    );
  }
}
