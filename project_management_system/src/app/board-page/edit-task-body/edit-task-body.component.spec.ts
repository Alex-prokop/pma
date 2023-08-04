import { ComponentFixture, TestBed } from '@angular/core/testing';
import {EditTaskBodyComponent} from './edit-task-body.component';

describe('EditTaskBodyComponent', () => {
  let component: EditTaskBodyComponent;
  let fixture: ComponentFixture<EditTaskBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTaskBodyComponent]
    });
    fixture = TestBed.createComponent(EditTaskBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
