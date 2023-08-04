import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewElementDialogBodyComponent } from '../add-new-element-dialog-body/add-new-element-dialog-body.component';

@Component({
  selector: 'app-add-new-element-dialog',
  templateUrl: './add-new-element-dialog.component.html',
  styleUrls: ['./add-new-element-dialog.component.css'],
})
export class AddNewElementDialogComponent implements OnInit {
  @Output() emitText: EventEmitter<any> = new EventEmitter();
  @Input() question: string = '';
  @Input() title: string = '';

  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}
  openDialog(): void {
    const dialogRef = this.dialog.open(AddNewElementDialogBodyComponent, {
      width: '400px',
      data: { title: this.title, question: this.question },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.emitText.emit(result);
    });
  }
}
