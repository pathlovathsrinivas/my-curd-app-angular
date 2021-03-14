import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {UserComponentComponent } from '../app/user-component/user-component.component';
import { PostsComponentComponent} from './posts-component/posts-component.component';
import { CommentsComponentComponent} from './comments-component/comments-component.component';


const routes: Routes = [

  { path: 'user', component: UserComponentComponent },
  { path: 'posts', component: PostsComponentComponent },
  { path: 'comment', component: CommentsComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

