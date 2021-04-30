import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'coolmovies';
  private code: string;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.code = this.route.snapshot.queryParamMap.get('code');
    if (this.code) {
      this.authService.setCode(this.code);
      this.authService.getAccessToken();
    }
  }
  getAuthLink() {
    return this.authService.getAuthorizationLink();
  }
}
