import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyIncidencesComponent } from './my-incidences.component';

describe('MyIncidencesComponent', () => {
  let component: MyIncidencesComponent;
  let fixture: ComponentFixture<MyIncidencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyIncidencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyIncidencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
