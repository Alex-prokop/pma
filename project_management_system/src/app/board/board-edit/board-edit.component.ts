import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardServiceV2 } from '../../services/board.service-v2';
import { ModalService } from '../../services/modal.service';
import { first, map } from 'rxjs/operators';
import { User } from '../../models/User';
import { AccountService } from '../../services/account.service';
import { Column } from '../../models/Board';

import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './board-edit.component.html',
  styleUrls: ['./board-edit.component.scss'],
})
export class BoardEditComponent implements OnInit {
  @Input() id: string = '';
  user?: User | null;
  boardId?: string;
  columns?: Column[];
  deleteCol?: string;
  deleteTas?: string;

  boardTitle?: string;
  isEditing: boolean = false;
  selectedColId?: string;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardServiceV2,
    private modalService: ModalService,
    private accountService: AccountService,
    private translate: TranslateService
  ) {
    this.user = this.accountService.userValue;
  }

  ngOnInit() {
    this.boardId = this.route.snapshot.params['id'];

    this.translate.stream('DELETE COLUMN').subscribe((translation: string) => {
      this.deleteCol = translation;
    });

    this.translate.stream('DELETE TASK').subscribe((translation: string) => {
      this.deleteTas = translation;
    });

    this.boardService
      .getBoardById(this.boardId!)
      .pipe(first())
      .subscribe((board) => (this.boardTitle = board.title));

    this.boardService
      .getColumns(this.boardId!)
      .pipe(first())
      .subscribe((columns) => {
        this.columns = columns.map((column) => {
          return { ...column, ...{ tasks: [] } };
        });
      });

    this.boardService
      .getBoardTasks(this.boardId!)
      .pipe(
        map((tasks) => {
          this.columns = this.columns!.map((column) => {
            const x = tasks.filter((x) => x.columnId == column._id);
            column.tasks.push(...x);
            return column;
          });
          return tasks;
        })
      )
      .pipe(first())
      .subscribe();
  }

  addColumn(title: string) {
    return this.boardService
      .createColumn(this.boardId!, title, 0)
      .pipe(first())
      .subscribe(
        (column) => this.columns!.push({ ...column, ...{ tasks: [] } }),
        (error) => console.error(error) // обработка ошибок здесь
      );
  }

  deleteColumn(BoardId: string | undefined, ColumnId: string) {
    this.modalService
      .openConfirmDialog(this.deleteCol!)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.boardService
            .deleteColumn(BoardId, ColumnId)
            .pipe(first())
            .subscribe(
              () =>
                (this.columns = this.columns!.filter(
                  (x) => x._id !== ColumnId
                )),
              (error) => console.error(error) // обработка ошибок здесь
            );
        }
      });
  }

  addTask(title: string, ColumnId: string) {
    return this.boardService
      .createTask(
        this.boardId!,
        ColumnId,
        this.user!.id!,
        title,
        'Add your task here!',
        0
      )
      .pipe(first())
      .subscribe((task) => {
        let index = this.columns!.map((column) => column._id).indexOf(ColumnId);
        this.columns![index].tasks.push(task);
      });
  }

  deleteTask(BoardId: string | undefined, ColumnId: string, TaskId: string) {
    this.modalService
      .openConfirmDialog(this.deleteTas!)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.boardService
            .deleteTask(BoardId, ColumnId, TaskId)
            .pipe(first())
            .subscribe(() => {
              const columnIndex = this.columns!.findIndex(
                (column) => column._id === ColumnId
              );
              if (columnIndex !== -1) {
                this.columns![columnIndex].tasks = this.columns![
                  columnIndex
                ].tasks.filter((task) => task._id !== TaskId);
              }
            });
        }
      });
  }

  editTask(
    BoardId: string | undefined,
    ColumnId: string,
    TaskId: string,
    title: string,
    description: string
  ) {
    return this.boardService
      .editTask(
        BoardId,
        ColumnId,
        TaskId,
        this.user!.id!,
        title,
        description,
        0
      )
      .pipe(first())
      .subscribe((res) => {
        this.ngOnInit();
      });
  }
  editColumn(BoardId: string | undefined, ColumnId: string, title: string) {
    this.selectedColId = undefined;
    return this.boardService
      .editColumn(BoardId, ColumnId, title, 0)
      .pipe(first())
      .subscribe((res) => {
        this.ngOnInit();
      });
  }
  changeEditing(event: Event) {
    this.selectedColId = (event.currentTarget as HTMLElement).id;
    this.isEditing = !this.isEditing;
  }
  cancelColumnEdit() {
    this.selectedColId = undefined;
  }
}
