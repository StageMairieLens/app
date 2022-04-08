import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoyGirlGameComponent } from './boy-girl-game.component';

describe('BoyGirlGameComponent', () => {
  let component: BoyGirlGameComponent;
  let fixture: ComponentFixture<BoyGirlGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoyGirlGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoyGirlGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
