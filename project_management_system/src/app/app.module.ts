// Angular core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from '@angular/common/http';
import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { NgOptimizedImage } from '@angular/common';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// App specific
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { MainRouteComponent } from './main-route/main-route.component';
import { BoardComponent } from './board/board.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardEditComponent } from './board/board-edit/board-edit.component';
import { DialogComponent } from './dialog/dialog.component';
import { EditTaskComponent } from './board-page/edit-task/edit-task.component';
import { AddNewElementDialogComponent } from './board-page/add-new-element-dialog/add-new-element-dialog.component';
import { AddNewElementDialogBodyComponent } from './board-page/add-new-element-dialog-body/add-new-element-dialog-body.component';
import { EditTaskBodyComponent } from './board-page/edit-task-body/edit-task-body.component';
import { AlertComponent } from './core/alert/alert.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

// Translation
import { TranslationModule } from './translation/translation.module';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainRouteComponent,
    BoardComponent,
    WelcomePageComponent,
    ProfileComponent,
    EditTaskBodyComponent,
    BoardEditComponent,
    DialogComponent,
    EditTaskComponent,
    AddNewElementDialogComponent,
    AddNewElementDialogBodyComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    CdkDropList,
    CdkDropListGroup,
    CdkDrag,
    NgOptimizedImage,
    TranslationModule,
    MatToolbarModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }
}
