import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface TaskData {
  title: string;
  description: string;
  question: string;
}

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnInit {
  taskForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: TaskData,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.editData) {
      this.initForm();
    }
  }

  private initForm(): void {
    this.taskForm = this.formBuilder.group({
      title: [this.editData.title, Validators.required],
      description: [this.editData.description, Validators.required],
    });
  }
}
