import { Component, Input, OnChanges, OnInit } from '@angular/core';
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
  constructor(private serieService: SerieService, public utils: UtilService) {}

  ngOnChanges(): void {
    this.loadedSeason = false;
    console.log(this.seasonId, this.serieId);
    this.serieService.getSeasonById(this.serieId, this.seasonId).subscribe(
      (season) => (this.season = season),
      (e) => {},
      () => (this.loadedSeason = true)
    );
  }
}
