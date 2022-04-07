import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconnaitreComponent } from './reconnaitre.component';

describe('ReconnaitreComponent', () => {
  let component: ReconnaitreComponent;
  let fixture: ComponentFixture<ReconnaitreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconnaitreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconnaitreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
