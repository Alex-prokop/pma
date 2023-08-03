import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNewElementDialogBodyComponent } from './add-new-element-dialog-body.component';

describe('AddNewElementDialogBodyComponent', () => {
  let component: AddNewElementDialogBodyComponent;
  let fixture: ComponentFixture<AddNewElementDialogBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewElementDialogBodyComponent]
    });
    fixture = TestBed.createComponent(AddNewElementDialogBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
