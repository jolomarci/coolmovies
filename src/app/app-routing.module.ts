import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MovieComponent } from './components/movie/movie.component';
import { SingleMovieComponent } from './components/single-movie/single-movie.component';
import { SerieComponent } from './components/serie/serie.component';

const routes: Routes = [
  { path: 'movies', component: MovieComponent },
  { path: 'movies/:page', component: MovieComponent },
  { path: 'movies/:genre', component: MovieComponent },
  { path: 'movies/:genre/:page', component: MovieComponent },
  { path: 'movie/:id', component: SingleMovieComponent },

  { path: 'series', component: SerieComponent },
  { path: 'series/:page', component: SerieComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
