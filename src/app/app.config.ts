import { ApplicationConfig } from '@angular/core';
import { routes } from './app.routes';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

// The withComponentInputBinding() function in the Angular provideRouter configuration enables component
// input binding from route parameters. It simplifies the process of passing route parameters to a component
// by directly mapping route parameters to component inputs.

// Purpose of withComponentInputBinding()
// The main purpose of adding withComponentInputBinding()
// is to automatically bind route parameters to a component's inputs, eliminating the need for manual
// subscription to ActivatedRoute observables (like paramMap or queryParamMap).
// This improves the developer experience and makes the code cleaner and more declarative.


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      })
    ),
    provideHttpClient(), // Add this to provide HttpClient

  ],
};

// How It Works
// When you define a route and specify parameters (path or query parameters):
// typescript
// نسخ الكود
// const routes = [
//   { path: 'user/:id', component: UserComponent }
// ];
// If the withComponentInputBinding() is used, the router automatically binds the id parameter to a corresponding input in the UserComponent:
// typescript
// نسخ الكود
// @Component({
//   selector: 'app-user',
//   template: '<p>User ID: {{ id }}</p>',
// })
// export class UserComponent {
//   @Input() id!: string; // Automatically receives the 'id' route parameter.
// }
// This removes the need for manual extraction of route parameters in the component like this:
// typescript
// نسخ الكود
// constructor(private route: ActivatedRoute) {}
// ngOnInit() {
//   this.route.paramMap.subscribe(params => {
//     this.id = params.get('id');
//   });
// }
