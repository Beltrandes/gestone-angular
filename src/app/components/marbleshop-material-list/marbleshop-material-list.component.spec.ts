import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarbleshopMaterialListComponent } from './marbleshop-material-list.component';

describe('MarbleshopMaterialListComponent', () => {
  let component: MarbleshopMaterialListComponent;
  let fixture: ComponentFixture<MarbleshopMaterialListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarbleshopMaterialListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarbleshopMaterialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
