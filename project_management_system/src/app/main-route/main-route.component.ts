import { Component, OnInit } from '@angular/core';

import { AccountService } from '../services/account.service';
import { first } from 'rxjs/operators';
import { ModalService } from '../services/modal.service';
import { BoardServiceV2 } from '../services/board.service-v2';

@Component({ templateUrl: 'main-route.component.html' })
export class MainRouteComponent implements OnInit {
  user: any;
  boards?: any[];

  constructor(
    private accountService: AccountService,
    private boardService: BoardServiceV2,
    private modalService: ModalService
  ) {
    this.user = this.accountService.userValue;
  }

  ngOnInit() {
    this.boardService
      .getById(this.user.id)
      .pipe(first())
      .subscribe((boards) => (this.boards = boards));
  }

  deleteBoard(id: string) {
    this.modalService
      .openConfirmDialog('Delete this board ?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.boardService
            .delete(id)
            .pipe(first())
            .subscribe(
              () => (this.boards = this.boards!.filter((x) => x._id !== id))
            );
        }
      });
  }
}
