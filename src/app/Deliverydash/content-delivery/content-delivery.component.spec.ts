import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDeliveryComponent } from './content-delivery.component';

describe('ContentDeliveryComponent', () => {
  let component: ContentDeliveryComponent;
  let fixture: ComponentFixture<ContentDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentDeliveryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
