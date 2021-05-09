import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MovieComponent } from './components/movie/movie.component';
import { SingleMovieComponent } from './components/single-movie/single-movie.component';
import { SerieComponent } from './components/serie/serie.component';
import { SingleSerieComponent } from './components/single-serie/single-serie.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/movies/1', pathMatch: 'full' },
  { path: 'movies', redirectTo: 'movies/1' },
  { path: 'movies/:page', component: MovieComponent },
  { path: 'movie/:id', component: SingleMovieComponent },

  { path: 'series', redirectTo: 'series/1' },
  { path: 'series/:page', component: SerieComponent },
  { path: 'serie/:id', component: SingleSerieComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
