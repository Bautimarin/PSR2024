import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFilmFormComponent } from './add-film-form.component';

describe('AddFilmFormComponent', () => {
  let component: AddFilmFormComponent;
  let fixture: ComponentFixture<AddFilmFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFilmFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFilmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
