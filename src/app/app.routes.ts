import { Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MoviesByIdComponent } from './movies-by-id/movies-by-id.component';
import {NotfoundComponent  } from './notfound/notfound.component';

export const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
  },
  {
    path: 'movies/:id',
    component: MoviesByIdComponent,
    title: 'Home details',
  },
  {
    path: 'deatils',
    component: NotfoundComponent,
    title: ' details',

  },

];
