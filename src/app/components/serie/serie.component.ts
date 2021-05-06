import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UtilService } from '../../services/util.service';
import { Serie } from '../../models/serie';
import { SerieService } from '../../services/serie.service';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css'],
})
export class SerieComponent implements OnInit {
  public series: Observable<Serie[]>;
  public loaded: boolean = false;

  public currentPage: number = 1;
  public currentSortBy: string = 'popular';

  constructor(
    private serieService: SerieService,
    private route: ActivatedRoute,
    public router: Router,
    private utils: UtilService
  ) {}

  ngOnInit(): void {
    this.loaded = false;
    this.route.params.subscribe((params) => {
      this.currentPage = this.utils.checkPageParam(+params['page']);
      console.log(this.currentPage, this.currentSortBy);
      this.getSeries();
    });
  }

  getSeries() {
    this.serieService.getSeries(this.currentPage, this.currentSortBy).subscribe(
      (data) => {
        this.series = of(data.results);
      },
      (e) => {},
      () => {
        this.loaded = true;
      }
    );
  }

  public getPoster(imageId: string): string {
    return this.utils.getImage(imageId, 'w500');
  }

  public setSortBy(value: string) {
    this.currentSortBy = value;
    this.router.navigate(['/series/1']);
  }
}
