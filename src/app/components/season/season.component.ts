import { Component, Input, OnChanges } from '@angular/core';
import { Season } from 'src/app/models/season';
import { SerieService } from 'src/app/services/serie.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css'],
})
export class SeasonComponent implements OnChanges {
  @Input('serieId') serieId: number;
  @Input('seasonId') seasonId: number;

  public season: Season;
  public loadedSeason: boolean = false;
  public type: string = 'serie';
  constructor(private serieService: SerieService, public utils: UtilService) {}

  ngOnChanges(): void {
    this.loadedSeason = false;
    console.log(this.seasonId, this.serieId);
    this.getSeason();
  }

  getSeason() {
    this.serieService.getSeasonById(this.serieId, this.seasonId).subscribe(
      (season) => (this.season = season),
      (error) => {
        this.serieService.handleError(error);
      },
      () => (this.loadedSeason = true)
    );
  }
}
