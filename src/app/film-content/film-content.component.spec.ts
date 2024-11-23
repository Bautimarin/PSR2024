import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmContentComponent } from './film-content.component';

describe('FilmContentComponent', () => {
  let component: FilmContentComponent;
  let fixture: ComponentFixture<FilmContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
