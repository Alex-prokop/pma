import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewElementDialogComponent } from './add-new-element-dialog.component';

describe('AddNewElementDialogComponent', () => {
  let component: AddNewElementDialogComponent;
  let fixture: ComponentFixture<AddNewElementDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewElementDialogComponent]
    });
    fixture = TestBed.createComponent(AddNewElementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
