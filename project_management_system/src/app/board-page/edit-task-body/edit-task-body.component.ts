import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-edit-task-body',
  templateUrl: './edit-task-body.component.html',
  styleUrls: ['./edit-task-body.component.scss'],
})
export class EditTaskBodyComponent implements OnInit {
  @Output() emitText: EventEmitter<any> = new EventEmitter();
  @Input() question: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  constructor(public dialog: MatDialog, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {}
  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      width: '400px',
      data: {
        question: this.question,
        title: this.title,
        description: this.description,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.emitText.emit(result);
      this.cdr.detectChanges();
    });
  }
}
