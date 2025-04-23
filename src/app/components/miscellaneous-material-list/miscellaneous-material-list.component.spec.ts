import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousMaterialListComponent } from './miscellaneous-material-list.component';

describe('MiscellaneousMaterialListComponent', () => {
  let component: MiscellaneousMaterialListComponent;
  let fixture: ComponentFixture<MiscellaneousMaterialListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiscellaneousMaterialListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiscellaneousMaterialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
