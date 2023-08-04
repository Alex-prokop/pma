import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from '../services/account.service';
import { AlertService } from '../services/alert.service';
import { ModalService } from '../services/modal.service';
import { TranslateService } from '@ngx-translate/core';

@Component({ templateUrl: 'profile.component.html' })
export class ProfileComponent implements OnInit {
  form!: FormGroup;
  id?: string;
  loading = false;
  submitting = false;
  submitted = false;
  deleteUs?: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private modalService: ModalService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.id = this.accountService.userValue?.id;
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    if (this.id) {
      this.getUserData();
    }

    this.translate.stream('DELETE USER').subscribe((translation: string) => {
      this.deleteUs = translation;
    });
  }

  async getUserData() {
    try {
      this.loading = true;
      const user = await this.accountService
        .getById(this.id!)
        .pipe(first())
        .toPromise();
      if (user) {
        this.form.patchValue(user);
      } else {
        throw new Error('User data not available');
      }
    } catch (error) {
      this.alertService.error(
        'An error occurred while loading user data. Please try again.'
      );
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (this.form.invalid) {
      return;
    }
    this.submitting = true;

    try {
      await this.saveUser(this.id!, this.form.value).pipe(first()).toPromise();
      this.alertService.success('User saved', {
        keepAfterRouteChange: true,
        autoClose: true,
      });
      this.router.navigateByUrl('/');
    } catch (error) {
      this.alertService.error(
        'An error occurred while updating the user profile. Please try again.'
      );
      console.error(error);
    } finally {
      this.submitting = false;
    }
  }

  private saveUser(id: string, user: any) {
    return this.accountService.update(id, user);
  }

  deleteUser() {
    if (!this.deleteUs) {
      this.alertService.error(
        'Translation for "DELETE USER" is missing. Please try again.'
      );
      return;
    }

    this.modalService
      .openConfirmDialog(this.deleteUs)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.deleteUserById(this.id!);
        }
      });
  }

  async deleteUserById(id: string) {
    try {
      await this.accountService.delete(id).pipe(first()).toPromise();
      this.id = undefined;
    } catch (error) {
      this.alertService.error(
        'An error occurred while deleting the user. Please try again.'
      );
      console.error(error);
    }
  }
}
