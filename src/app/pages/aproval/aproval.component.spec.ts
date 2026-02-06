import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprovalComponent } from './aproval.component';

describe('AprovalComponent', () => {
  let component: AprovalComponent;
  let fixture: ComponentFixture<AprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AprovalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
