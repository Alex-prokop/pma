import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from '../services/account.service';
import { BoardServiceV2 } from '../services/board.service-v2';
import { AlertService } from '../services/alert.service';

@Component({
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  form!: FormGroup;
  id?: string;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private boardService: BoardServiceV2,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.id = this.accountService.userValue?.id;
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.createBoard(this.form.get('title')?.value, this.id!)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Board created', {
            keepAfterRouteChange: true,
            autoClose: true,
          });
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          this.alertService.error(error);
          this.loading = false;
        },
      });
  }

  private createBoard(title: string, userId: string) {
    return this.boardService.create(title, userId);
  }
}
