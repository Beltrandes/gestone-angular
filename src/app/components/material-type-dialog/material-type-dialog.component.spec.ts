import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTypeDialogComponent } from './material-type-dialog.component';

describe('MaterialTypeDialogComponent', () => {
  let component: MaterialTypeDialogComponent;
  let fixture: ComponentFixture<MaterialTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialTypeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
