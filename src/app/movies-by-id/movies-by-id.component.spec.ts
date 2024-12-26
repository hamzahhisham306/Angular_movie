import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesByIdComponent } from './movies-by-id.component';

describe('MoviesByIdComponent', () => {
  let component: MoviesByIdComponent;
  let fixture: ComponentFixture<MoviesByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
