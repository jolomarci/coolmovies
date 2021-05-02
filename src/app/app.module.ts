import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieComponent } from './components/movie/movie.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MovieService } from './services/movie.service';
import { SingleMovieComponent } from './components/single-movie/single-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    NavbarComponent,
    SingleMovieComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [MovieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
