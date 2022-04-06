import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecopierGameComponent } from './recopier-game.component';

describe('RecopierGameComponent', () => {
  let component: RecopierGameComponent;
  let fixture: ComponentFixture<RecopierGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecopierGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecopierGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
