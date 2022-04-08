import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbecedaireComponent } from './abecedaire.component';

describe('AbecedaireComponent', () => {
  let component: AbecedaireComponent;
  let fixture: ComponentFixture<AbecedaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbecedaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbecedaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
