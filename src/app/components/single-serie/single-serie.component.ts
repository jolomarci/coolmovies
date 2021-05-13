import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Season, SingleSerie } from 'src/app/models/single-serie';
import { SerieService } from 'src/app/services/serie.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-single-serie',
  templateUrl: './single-serie.component.html',
  styleUrls: ['./single-serie.component.css'],
})
export class SingleSerieComponent implements OnInit {
  public serie: SingleSerie;
  public loaded: boolean = false;
  public selectedSeason: Season;
  public favourite: boolean = false;
  constructor(
    private serieService: SerieService,
    private route: ActivatedRoute,
    public utils: UtilService
  ) {}

  ngOnInit(): void {
    this.loaded = false;
    let id: number = +this.route.snapshot.params['id'];
    this.serieService.getSerieById(id).subscribe(
      (serie) => {
        this.serie = serie;
        this.selectedSeason = serie.seasons[0];
        this.setFavourite();
      },
      (error) => {
        this.serieService.handleError(error);
      },
      () => (this.loaded = true)
    );
  }

  setFavourite() {
    let series: SingleSerie[] = JSON.parse(localStorage.getItem('series'));
    if (series !== null) {
      series.forEach((serie) => {
        if (serie.id == this.serie.id) this.favourite = true;
      });
    }
  }

  addFavourite(serie) {
    this.serieService.saveSeries(serie);
    this.setFavourite();
  }
}
