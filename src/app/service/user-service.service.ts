import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { environment } from '../../environments/environment'
import { map } from 'rxjs/operators';
import { apiurl } from '../shared/app.constant'
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  getUserDetails(): Observable<any> {
    return this.http.get(`${environment.url}/${apiurl.users}`)
      .pipe(map(data => data));
  }
  deleteUser(id): Observable<any> {
    return this.http.delete(`${environment.url}/${apiurl.users}/${id}`)
      .pipe(map(data => data))
  }
  getPostDetails(): Observable<any> {
    return this.http.get(`${environment.url}/${apiurl.post}`)
      .pipe(map(data => data))
  }
  deletePost(id): Observable<any> {
    return this.http.delete(`${environment.url}/${apiurl.post}/${id}`)
      .pipe(map(data => data))
  }
  getCommentDetails(): Observable<any> {
    return this.http.get(`${environment.url}/${apiurl.comments}`)
      .pipe(map(data => data))
  }
  deleteComment(id): Observable<any> {
    return this.http.delete(`${environment.url}/${apiurl.comments}/${id}`)
      .pipe(map(data => data))
  }
}

