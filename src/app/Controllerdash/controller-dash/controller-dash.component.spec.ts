import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerDashComponent } from './controller-dash.component';

describe('ControllerDashComponent', () => {
  let component: ControllerDashComponent;
  let fixture: ComponentFixture<ControllerDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControllerDashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControllerDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
