import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { Movie } from './movie.model';

@Injectable({
  providedIn: 'root',
})

export class MovieClass {
  private movieList = signal<Movie[]>([]); // Signal to hold movie list
  private httpClient = inject(HttpClient);
  private movieById = signal<Movie[]>([]); // Signal to hold movie list

  isLoading = false;
  loadedMovies = this.movieList.asReadonly();
  loadedMovieById = this.movieById.asReadonly();

  loadMovies(url: string) {
    return this.getDataFromServer(url).pipe(
      tap({
        next: (movies) => {
          this.movieList.set(movies); // Update the signal value with the movie list
        },
      })
    );
  }
  loadMovieByID(url:string){
    console.log("URL>>>>>>>>>>>>",url)
    return this.getDataFromServer(url).pipe(
      tap({
        next:(movie)=>{
          console.log("<ovie>></ovie>>",movie)
          this.movieById.set(movie)
        }
      })
    )
  }

  setLoading(status:boolean){
    this.isLoading = status;
  }

  private getDataFromServer(url: string) {
    if (url.includes('/movie/')) {
      // Individual movie endpoint
      return this.httpClient.get<Movie>(url).pipe(
        map(movie => [movie]) // Wrap single movie in array to match signal type
      );
    }
    // Movie list endpoint
    return this.httpClient.get<{ results: Movie[] }>(url).pipe(
      map(response => response.results)
    );
  }

}


// @Injectable: This decorator marks the class as an injectable service that can be injected into other components or services. The providedIn: 'root' indicates that this service will be available globally in the root injector of the application.
// inject: This is an Angular Dependency Injection (DI) function that allows the class to retrieve the instance of a service (like HttpClient) without using a constructor. It allows for a cleaner, more functional style of dependency injection.
// signal: This is a reactive primitive, similar to BehaviorSubject or ReplaySubject, but it works in the context of Angular's new Signal-based reactivity system. It is used to hold a value that changes reactively, and any component bound to it will automatically update when its value changes.
// HttpClient: Angular's HTTP client to perform HTTP requests (like GET, POST, etc.). It returns Observable objects.
// map: A RxJS operator used to transform the response. In this case, it extracts the results property from the API response.
// tap: Another RxJS operator used to execute side effects, like logging or debugging, without modifying the response. It is used here to log the movies and update the movie list.
// Movie: This is a type or interface representing the structure of a Movie. It is imported from './movie.model' and is used to define the type of movies being handled.
