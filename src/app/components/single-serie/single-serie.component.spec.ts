import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSerieComponent } from './single-serie.component';

describe('SingleSerieComponent', () => {
  let component: SingleSerieComponent;
  let fixture: ComponentFixture<SingleSerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleSerieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
