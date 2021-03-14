import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponentComponent } from './user-component/user-component.component';
import { PostsComponentComponent } from './posts-component/posts-component.component';
import { CommentsComponentComponent } from './comments-component/comments-component.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmServiceComponent } from './confirm-service/confirm-service.component';
import { ConfirmServiceService } from './shared/confirm-service.service';


@NgModule({
  declarations: [
    AppComponent,
    UserComponentComponent,
    PostsComponentComponent,
    CommentsComponentComponent,
    ConfirmServiceComponent

  ],
  imports: [
    BrowserModule, FormsModule,
    AppRoutingModule, HttpClientModule, MatCardModule, MatDialogModule, MatIconModule,
    BrowserAnimationsModule, MatPaginatorModule, MatFormFieldModule, MatTableModule, MatInputModule, MatButtonModule
  ],
  providers: [ConfirmServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
