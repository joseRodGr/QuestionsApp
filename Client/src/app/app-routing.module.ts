import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login/login.component';
import { MainPanelComponent } from './main/main-panel/main-panel.component';
import { CreateQuestionComponent } from './question/create-question/create-question.component';
import { QuestionAskedDetailComponent } from './question/question-asked-detail/question-asked-detail.component';
import { QuestionReceivedDetailComponent } from './question/question-received-detail/question-received-detail.component';
import { QuestionsAskedComponent } from './question/questions-asked/questions-asked.component';
import { QuestionsReceivedComponent } from './question/questions-received/questions-received.component';
import { RegisterComponent } from './register/register.component';
import { ErrorTestingComponent } from './_errors/error-testing/error-testing.component';
import { NotFoundComponent } from './_errors/not-found/not-found.component';
import { ServerErrorComponent } from './_errors/server-error/server-error.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

const routes: Routes = [

  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'question-panel', component: MainPanelComponent, 
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
   children: [
     {path: '', redirectTo: 'received', pathMatch: 'full'},
     {path: 'asked', component: QuestionsAskedComponent},
     {path: 'create', component: CreateQuestionComponent, canDeactivate:[PreventUnsavedChangesGuard]},
     {path: 'asked/:id', component: QuestionAskedDetailComponent},
     {path: 'received', component: QuestionsReceivedComponent},
     {path: 'received/:id', component: QuestionReceivedDetailComponent}
   ]
  },
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: 'error-testing', component: ErrorTestingComponent},
  {path:'**', redirectTo: 'not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
