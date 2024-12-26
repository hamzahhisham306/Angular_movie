import { Component, input, Input } from '@angular/core';
import { Movie } from '../movies/movie.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-card-movie',
  imports: [CommonModule, RouterLink],
  templateUrl: './card-movie.component.html',
  styleUrl: './card-movie.component.css',
  standalone: true,

})
export class CardMovieComponent {
  movie = input.required<Movie>();
  IMGPATH = 'https://image.tmdb.org/t/p/w1280';

  getClassByRate(vote: number) {
    if (vote >= 8) {
      return 'green';
    } else if (vote >= 5) {
      return 'orange';
    } else {
      return 'red';
    }
  }
}
