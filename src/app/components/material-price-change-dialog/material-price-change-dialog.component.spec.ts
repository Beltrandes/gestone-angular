import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialPriceChangeDialogComponent } from './material-price-change-dialog.component';

describe('MaterialPriceChangeDialogComponent', () => {
  let component: MaterialPriceChangeDialogComponent;
  let fixture: ComponentFixture<MaterialPriceChangeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialPriceChangeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialPriceChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
