import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login/login.component';
import { MainPanelComponent } from './main/main-panel/main-panel.component';
import { CreateQuestionComponent } from './question/create-question/create-question.component';
import { QuestionAskedDetailComponent } from './question/question-asked-detail/question-asked-detail.component';
import { QuestionReceivedDetailComponent } from './question/question-received-detail/question-received-detail.component';
import { QuestionsAskedComponent } from './question/questions-asked/questions-asked.component';
import { QuestionsReceivedComponent } from './question/questions-received/questions-received.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [

  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'question-panel', component: MainPanelComponent, 
   children: [
     {path: '', redirectTo: 'received', pathMatch: 'full'},
     {path: 'asked', component: QuestionsAskedComponent},
     {path: 'create', component: CreateQuestionComponent},
     {path: 'asked/:id', component: QuestionAskedDetailComponent},
     {path: 'received', component: QuestionsReceivedComponent},
     {path: 'received/:id', component: QuestionReceivedDetailComponent}
   ]
  },
  {path:'**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
