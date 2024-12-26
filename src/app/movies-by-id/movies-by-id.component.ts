import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieClass } from '../movies/movies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies-by-id',
  templateUrl: './movies-by-id.component.html',
  styleUrls: ['./movies-by-id.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class MoviesByIdComponent implements OnInit {
  id: string;
  movieService = inject(MovieClass);
  movieById = this.movieService.loadedMovieById;

  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieService
        .loadMovieByID(`https://api.themoviedb.org/3/movie/${params['id']}?api_key=04c35731a5ee918f014970082a0088b1`)
        .subscribe();
    });
  }
}
