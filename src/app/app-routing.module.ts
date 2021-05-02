import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MovieComponent } from './components/movie/movie.component';
import { SingleMovieComponent } from './components/single-movie/single-movie.component';

const routes: Routes = [
  { path: 'movies', component: MovieComponent },
  { path: 'movies/:page', component: MovieComponent },
  { path: 'movie/:id', component: SingleMovieComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
