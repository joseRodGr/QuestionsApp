import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav/nav.component';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainPanelComponent } from './main/main-panel/main-panel.component';
import { QuestionsAskedComponent } from './question/questions-asked/questions-asked.component';
import { QuestionBoxComponent } from './question/question-box/question-box.component';
import { QuestionsReceivedComponent } from './question/questions-received/questions-received.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { QuestionAskedDetailComponent } from './question/question-asked-detail/question-asked-detail.component';
import { QuestionReceivedDetailComponent } from './question/question-received-detail/question-received-detail.component';
import { AnswerBoxComponent } from './answer/answer-box/answer-box.component';
import { AnswerReceivedBoxComponent } from './answer/answer-received-box/answer-received-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './_modules/material/material.module';
import { WarningDialogComponent } from './_dialogs/warning-dialog/warning-dialog.component';
import { CreateQuestionComponent } from './question/create-question/create-question.component';
import { AnswerCreateBoxComponent } from './answer/answer-create-box/answer-create-box.component';
import { RegisterComponent } from './register/register.component';
import { CreateDialogComponent } from './_dialogs/create-dialog/create-dialog.component';
import { ShareDialogComponent } from './_dialogs/share-dialog/share-dialog.component';
import { GenericBoxComponent } from './_dialogs/generic-box/generic-box.component';
import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './_errors/not-found/not-found.component';
import { ErrorTestingComponent } from './_errors/error-testing/error-testing.component';
import { ServerErrorComponent } from './_errors/server-error/server-error.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    MainPanelComponent,
    QuestionsAskedComponent,
    QuestionBoxComponent,
    QuestionsReceivedComponent,
    QuestionAskedDetailComponent,
    QuestionReceivedDetailComponent,
    AnswerBoxComponent,
    AnswerReceivedBoxComponent,
    WarningDialogComponent,
    CreateQuestionComponent,
    AnswerCreateBoxComponent,
    RegisterComponent,
    CreateDialogComponent,
    ShareDialogComponent,
    GenericBoxComponent,
    NotFoundComponent,
    ErrorTestingComponent,
    ServerErrorComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
