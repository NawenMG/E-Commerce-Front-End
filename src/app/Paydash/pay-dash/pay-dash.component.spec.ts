import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayDashComponent } from './pay-dash.component';

describe('PayDashComponent', () => {
  let component: PayDashComponent;
  let fixture: ComponentFixture<PayDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayDashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
