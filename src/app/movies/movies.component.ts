import {
  Component,
  OnInit,
  DestroyRef,
  inject,
  ViewChild,
} from '@angular/core';
import { MovieClass } from './movies.service';
import { CardMovieComponent } from '../card-movie/card-movie.component';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CardMovieComponent, RouterModule,LoadingComponent, CommonModule, FormsModule],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'], // Corrected plural form
})
export class MoviesComponent implements OnInit {
  APIURL =
    'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
  SEARCHAPI =
    'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';
  moviesSeverices = inject(MovieClass);
  private destroyRef = inject(DestroyRef);
  movies: any[] = []; // Ensure movies is an array, not a signal
  isLoading = false; // Use a boolean for loader state
  // @ViewChild('form') form!: NgForm;

  ngOnInit() {
    console.log("REEEEEEEEEEEEEE")
    this.isLoading = true;
    const subscription = this.moviesSeverices
      .loadMovies(this.APIURL)
      .subscribe({
        next: (movies) => (this.movies = movies),
        error: (err) => console.error('Error loading movies:', err),
        complete: () => {
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        },
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
  onSubmit(formData: NgForm) {
    this.isLoading = true;
    const searchValue = formData.form.value.search;
    this.moviesSeverices.loadMovies(this.SEARCHAPI + searchValue).subscribe({
      next: (movies) => (this.movies = movies),
      error: (err) => console.log('Error in searching movies', err),
      complete: () => {
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      },
    });
  }
}
// Use trackBy for Better Performance
// Problem
// When using *ngFor, you should use the trackBy function for better performance, especially with dynamic lists like movie
// This prevents Angular from re-rendering all movies if only one movie changes. Instead, Angular re-renders only the modified movie.

// CommonModule: Provides basic Angular directives like ngIf, ngFor, etc.

// FormsModule: Required to use ngModel, which enables two-way data binding with form inputs.

// NgForm: Represents a form reference when using the #form="ngForm" syntax.

// #form="ngForm": References the form so it can be accessed in the component.

// ngModel: Enables two-way binding, so the input field can be accessed via formData.
